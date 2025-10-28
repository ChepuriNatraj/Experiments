import os
from pathlib import Path
import ebooklib
from ebooklib import epub
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_JUSTIFY
from html.parser import HTMLParser
import re

class HTMLTextExtractor(HTMLParser):
    """Extract text from HTML content"""
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.in_title = False
        
    def handle_starttag(self, tag, attrs):
        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.in_title = True
            self.text_parts.append('\n\n')
    
    def handle_endtag(self, tag):
        if tag in ['p', 'div', 'br']:
            self.text_parts.append('\n')
        elif tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.in_title = False
            self.text_parts.append('\n\n')
    
    def handle_data(self, data):
        if data.strip():
            self.text_parts.append(data.strip() + ' ')
    
    def get_text(self):
        return ''.join(self.text_parts)

def clean_text(text):
    """Clean and normalize text"""
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text)
    # Remove special characters that might cause issues
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2013', '-').replace('\u2014', '-')
    return text.strip()

def convert_epub_to_pdf(epub_path, pdf_path):
    """Convert a single EPUB file to PDF using ebooklib and reportlab"""
    try:
        # Read the EPUB file
        book = epub.read_epub(epub_path)
        
        # Create PDF
        doc = SimpleDocTemplate(
            pdf_path,
            pagesize=letter,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=18,
        )
        
        # Container for PDF elements
        story = []
        
        # Get styles
        styles = getSampleStyleSheet()
        styles.add(ParagraphStyle(
            name='Justify',
            alignment=TA_JUSTIFY,
            fontSize=11,
            leading=14
        ))
        
        # Get book title
        title = book.get_metadata('DC', 'title')
        if title:
            story.append(Paragraph(f"<b>{title[0][0]}</b>", styles['Title']))
            story.append(Spacer(1, 0.2*inch))
        
        # Get book author
        author = book.get_metadata('DC', 'creator')
        if author:
            story.append(Paragraph(f"<i>by {author[0][0]}</i>", styles['Normal']))
            story.append(Spacer(1, 0.5*inch))
        
        # Extract and add content
        for item in book.get_items():
            if item.get_type() == ebooklib.ITEM_DOCUMENT:
                # Extract HTML content
                html_content = item.get_content().decode('utf-8', errors='ignore')
                
                # Extract text from HTML
                extractor = HTMLTextExtractor()
                extractor.feed(html_content)
                text = extractor.get_text()
                
                # Clean text
                text = clean_text(text)
                
                if text:
                    # Split into paragraphs
                    paragraphs = text.split('\n\n')
                    for para in paragraphs:
                        para = para.strip()
                        if para:
                            try:
                                # Add paragraph to story
                                p = Paragraph(para, styles['Justify'])
                                story.append(p)
                                story.append(Spacer(1, 0.1*inch))
                            except Exception:
                                # If paragraph fails, skip it
                                continue
        
        # Build PDF
        doc.build(story)
        print(f"✓ Successfully converted: {os.path.basename(epub_path)}")
        return True
                
    except Exception as e:
        print(f"✗ Error converting {os.path.basename(epub_path)}: {str(e)}")
        return False

def main():
    # Define paths
    source_folder = r"C:\Users\NATRAJ\Desktop\BOOKS"
    output_folder = r"C:\Users\NATRAJ\Desktop\BOOKS\pdf"
    
    print("EPUB to PDF Converter\n")
    
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)
    
    # Find all EPUB files
    epub_files = list(Path(source_folder).glob("*.epub"))
    
    if not epub_files:
        print("No EPUB files found in the source folder!")
        return
    
    print(f"Found {len(epub_files)} EPUB file(s) to convert...\n")
    
    # Convert each EPUB file
    successful = 0
    failed = 0
    
    for epub_file in epub_files:
        # Create PDF filename
        pdf_filename = epub_file.stem + ".pdf"
        pdf_path = os.path.join(output_folder, pdf_filename)
        
        print(f"Converting: {epub_file.name} ...")
        
        if convert_epub_to_pdf(str(epub_file), pdf_path):
            successful += 1
        else:
            failed += 1
    
    # Print summary
    print(f"\n{'='*50}")
    print(f"Conversion Complete!")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    print(f"Output folder: {output_folder}")
    print(f"{'='*50}")

if __name__ == "__main__":
    main()
