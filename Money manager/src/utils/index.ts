import { Expense, ExpenseCategory, CategoryMapping, ExpenseStats, MonthlyBudget } from '../types';

// Category mapping for 50-30-20 rule
export const categoryMapping: CategoryMapping = {
  'Food': 'needs',
  'College Expenses': 'needs',
  'Snacks': 'wants',
  'Miscellaneous': 'wants',
};

// Default budget percentages
export const defaultBudgetRule = {
  needs: 50,
  wants: 30,
  savings: 20,
};

// Storage keys
export const STORAGE_KEYS = {
  EXPENSES: 'money-manager-expenses',
  BUDGET: 'money-manager-budget',
  INCOME: 'money-manager-income',
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
};

// Calculate expense stats
export const calculateExpenseStats = (expenses: Expense[]): ExpenseStats => {
  const stats: ExpenseStats = {
    totalSpent: 0,
    needsSpent: 0,
    wantsSpent: 0,
    savingsSpent: 0,
    categoryBreakdown: {
      'Food': 0,
      'Snacks': 0,
      'College Expenses': 0,
      'Miscellaneous': 0,
    },
  };

  expenses.forEach(expense => {
    stats.totalSpent += expense.amount;
    stats.categoryBreakdown[expense.category] += expense.amount;
    
    const budgetCategory = categoryMapping[expense.category];
    if (budgetCategory === 'needs') {
      stats.needsSpent += expense.amount;
    } else if (budgetCategory === 'wants') {
      stats.wantsSpent += expense.amount;
    } else if (budgetCategory === 'savings') {
      stats.savingsSpent += expense.amount;
    }
  });

  return stats;
};

// Calculate budget status
export const calculateBudgetStatus = (stats: ExpenseStats, budget: MonthlyBudget) => {
  return {
    needs: {
      spent: stats.needsSpent,
      budget: budget.needs,
      percentage: budget.needs > 0 ? (stats.needsSpent / budget.needs) * 100 : 0,
      remaining: budget.needs - stats.needsSpent,
    },
    wants: {
      spent: stats.wantsSpent,
      budget: budget.wants,
      percentage: budget.wants > 0 ? (stats.wantsSpent / budget.wants) * 100 : 0,
      remaining: budget.wants - stats.wantsSpent,
    },
    savings: {
      spent: stats.savingsSpent,
      budget: budget.savings,
      percentage: budget.savings > 0 ? (stats.savingsSpent / budget.savings) * 100 : 0,
      remaining: budget.savings - stats.savingsSpent,
    },
  };
};

// Get status color based on percentage
export const getStatusColor = (percentage: number): string => {
  if (percentage <= 50) return 'text-green-600';
  if (percentage <= 80) return 'text-yellow-600';
  return 'text-red-600';
};

// Get progress bar color
export const getProgressColor = (percentage: number): string => {
  if (percentage <= 50) return 'bg-green-500';
  if (percentage <= 80) return 'bg-yellow-500';
  return 'bg-red-500';
};

// Filter expenses by date range
export const filterExpensesByMonth = (expenses: Expense[], year: number, month: number): Expense[] => {
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
  });
};

// Get current month expenses
export const getCurrentMonthExpenses = (expenses: Expense[]): Expense[] => {
  const now = new Date();
  return filterExpensesByMonth(expenses, now.getFullYear(), now.getMonth());
};