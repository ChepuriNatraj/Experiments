# EPUB to PDF Converter

A Python-based tool to convert EPUB ebook files to PDF format with a focus on text extraction, perfect for feeding content into LLMs and notebook applications.

## 📖 Story Behind This Project

I discovered a website where I could download my favorite books, and I got excited and started downloading them. However, there was one problem - all the books were in EPUB format. 

Instead of using online converters (which often have limitations, privacy concerns, or require payment), I decided to create my own solution through code. This converter is specifically designed for extracting pure text content, making it ideal for:
- Uploading to LLM applications
- Creating text-based notebooks
- Reading on devices that prefer PDF format
- Personal archiving and organization

## ✨ Features

- ✅ Batch conversion of multiple EPUB files
- ✅ Preserves book metadata (title, author)
- ✅ Clean text formatting with proper paragraphs
- ✅ Automatic output folder creation
- ✅ Progress tracking during conversion
- ✅ Error handling for problematic files

## ⚠️ Limitations

This converter focuses on **text extraction only**:
- ❌ Does **not** convert images from EPUB files
- ❌ Does **not** preserve emojis or special characters perfectly
- ❌ Does **not** maintain complex formatting (tables, colored text, etc.)
- ✅ **Perfect for**: Pure text extraction for LLMs, note-taking apps, and text analysis

## 🎯 Use Cases

This tool is particularly helpful if you:
- Want to upload book content to ChatGPT, Claude, or other LLMs
- Need plain text versions of ebooks for research
- Prefer reading PDFs over EPUB format
- Want to create your own ebook conversion pipeline
- Need to extract text content programmatically

## 🛠️ Prerequisites

Before running this script, you need:

1. **Python 3.7 or higher** installed on your system
   - Check: Open terminal/command prompt and run `python --version`

2. **Required Python libraries:**
   - `ebooklib` - for reading EPUB files
   - `reportlab` - for creating PDF files

## 📦 Installation

1. **Clone this repository** (or download the files):
```bash
git clone https://github.com/ChepuriNatraj/Experiments.git
cd Experiments/EPUB-to-PDF-Converter
```

2. **Install required dependencies:**
```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install ebooklib reportlab
```

## 🚀 Usage

### Basic Usage

1. **Update the paths** in the script:
   - Open `epub_to_pdf_converter.py`
   - Modify `source_folder` to point to your EPUB files location
   - Modify `output_folder` to your desired PDF output location

2. **Run the converter:**
```bash
python epub_to_pdf_converter.py
```

### Example

```python
# In the script, modify these paths:
source_folder = r"C:\Users\YourName\Desktop\BOOKS"
output_folder = r"C:\Users\YourName\Desktop\BOOKS\pdf"
```

Then run:
```bash
python epub_to_pdf_converter.py
```

### Expected Output

```
EPUB to PDF Converter

Found 31 EPUB file(s) to convert...

Converting: Book1.epub ...
✓ Successfully converted: Book1.epub
Converting: Book2.epub ...
✓ Successfully converted: Book2.epub
...

==================================================
Conversion Complete!
Successful: 31
Failed: 0
Output folder: C:\Users\YourName\Desktop\BOOKS\pdf
==================================================
```

## 📝 How It Works

1. **Scans** the source folder for all `.epub` files
2. **Extracts** text content from each EPUB using `ebooklib`
3. **Cleans** the text (removes excessive whitespace, normalizes quotes)
4. **Creates** a PDF using `reportlab` with proper formatting
5. **Saves** PDFs to the output folder with the same filename

## 🔧 Customization

You can modify the script to:
- Change font size (currently 11pt)
- Adjust margins (currently 72pt/1 inch)
- Modify text alignment (currently justified)
- Add custom headers/footers
- Change page size (currently letter size)

## 🤝 Contributing

Found a bug? Have a suggestion? Want to add image support?

Feel free to:
- Open an issue
- Submit a pull request
- Fork and create your own version
- Contact me with ideas!

## 💬 Connect With Me

If you find this useful or have improvements to suggest, I'd love to hear from you!

- GitHub: [@ChepuriNatraj](https://github.com/ChepuriNatraj)
- Feel free to star ⭐ this repository if you found it helpful!

## 📄 License

This project is open source and available for anyone to use and modify.

## 🙏 Acknowledgments

- Built with [ebooklib](https://github.com/aerkalov/ebooklib) for EPUB parsing
- PDF generation powered by [ReportLab](https://www.reportlab.com/)

---

**Note**: This tool is for personal use and educational purposes. Please respect copyright laws and only convert books you have the legal right to convert.
