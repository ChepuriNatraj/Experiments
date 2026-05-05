# 💰 Money Manager - Glassmorphism Edition

A beautiful, modern expense tracking website with stunning glassmorphism design. Track your expenses, manage your budget, and follow the 50-30-20 rule with style!

## Features

- **Expense Tracking**: Add, view, and delete expenses with categories
- **Categories**: Food, Snacks, College Expenses, Miscellaneous
- **50-30-20 Rule**: Automatic budget analysis following the popular budgeting rule
- **Dashboard**: Visual overview of your spending patterns and budget status
- **Expense History**: Search, filter, and sort your expense history
- **Budget Settings**: Set your income and customize budget allocations
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Your data is stored locally in your browser

## Category Mapping for 50-30-20 Rule

- **Needs (50%)**: Food, College Expenses
- **Wants (30%)**: Snacks, Miscellaneous  
- **Savings/Debt (20%)**: User-defined savings goals

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd money-manager
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Chart.js** - Data visualization (future feature)

## Usage

### Adding Expenses
1. Navigate to the "Add Expense" tab
2. Fill in the date, amount, category, and description
3. Select payment method (optional)
4. Click "Add Expense"

### Viewing Dashboard
- See your monthly spending overview
- Track your progress against the 50-30-20 rule
- View category breakdowns and recent expenses

### Managing Budget
1. Go to "Budget Settings"
2. Set your monthly income
3. Choose between automatic 50-30-20 allocation or custom budget
4. Save your settings

### Expense History
- View all your expenses in one place
- Search by description or category
- Filter by category
- Sort by date, amount, or category
- Delete unwanted expenses

## Data Storage

All data is stored locally in your browser using localStorage. This means:
- Your data is private and stays on your device
- Data persists between browser sessions
- Clearing browser data will remove your expenses
- No internet connection required after initial load

## Future Enhancements

- [ ] Export data to CSV/PDF
- [ ] Receipt photo uploads
- [ ] Recurring expense tracking
- [ ] Advanced analytics and charts
- [ ] Budget alerts and notifications
- [ ] Multiple currency support
- [ ] Data backup and sync

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.