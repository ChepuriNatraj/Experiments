# Money Manager

A personal expense tracking application built to solve a simple problem: understanding where my money goes and managing it better.

## Why This Exists

I couldn't track how my money was being spent. I couldn't manage my finances effectively. Instead of using existing apps with features I don't need, I built this using AI.

This project is an experiment in AI-assisted development. The entire application was built using Claude Sonnet 3.5, demonstrating that in 2024, you can customize and create your own applications without being a full-time developer.

## What It Does

Personal expense tracking with budget management based on the 50-30-20 rule:
- **50% Needs**: Essential expenses (food, college expenses)
- **30% Wants**: Non-essential spending (snacks, entertainment)
- **20% Savings**: Money set aside

### Features

- Track daily expenses with categories
- Set monthly income and automatic budget allocation
- View spending breakdown by category and budget type
- Visualize expenses with charts
- Filter and search expense history
- Delete expenses when needed

### Categories

- Food
- Snacks
- College Expenses
- Miscellaneous

Each category automatically maps to needs, wants, or savings based on the 50-30-20 rule.

## Technical Stack

Built with modern web technologies:
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization
- **localStorage** - Data persistence

## Data Storage

All data is stored locally in your browser using localStorage. This means:
- No server costs
- No data sent anywhere
- Your financial data stays on your device
- Clear browser data = lose all records (export/backup features not yet implemented)

## Setup and Usage

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ChepuriNatraj/Experiments.git
cd Experiments/Money\ manager

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will open at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## How to Use

1. **Set Your Income**: Go to Budget tab and enter your monthly income
2. **Budget Allocation**: The app automatically splits it 50-30-20, or customize it
3. **Add Expenses**: Click "Add Expense" and enter details
4. **Track Progress**: Dashboard shows spending vs budget in real-time
5. **Review History**: Check all expenses in the History tab

## Current Limitations

Being honest about what this doesn't do:
- No cloud sync - data stays in browser only
- No export/import functionality yet
- No recurring expense tracking
- No multi-currency support
- No receipt scanning or photo attachments
- No collaboration features
- No mobile app (works in mobile browser though)

## Why Build This With AI?

This is an experiment in what's possible with AI-assisted development. The entire codebase was created through conversations with Claude Sonnet 3.5. No traditional coding required.

This demonstrates:
- Anyone can build custom tools for their specific needs
- AI can translate requirements into working applications
- You don't need to compromise with off-the-shelf solutions

## Future Ideas

Things I might add if needed:
- Export data to CSV/JSON
- Import past expenses
- Custom categories
- Recurring expense tracking
- Budget rollover for unused amounts
- Yearly spending analysis
- Dark mode

But for now, it solves the core problem: tracking where my money goes.

## Project Structure

```
Money manager/
├── src/
│   ├── components/      # React components
│   │   ├── Dashboard.tsx
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseList.tsx
│   │   └── BudgetSettings.tsx
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main application
│   └── main.tsx        # Entry point
├── package.json        # Dependencies
└── vite.config.ts      # Build configuration
```

## License

Open source. Use it, modify it, learn from it. No restrictions.

## Contributing

This is a personal experiment, but if you find bugs or have suggestions, feel free to open an issue.

---

**Built with**: Claude Sonnet 3.5  
**Purpose**: Learning and practical problem-solving  
**Status**: Experimental, actively used