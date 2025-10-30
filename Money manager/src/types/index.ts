export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  paymentMethod?: string;
}

export type ExpenseCategory = 'Food' | 'Snacks' | 'College Expenses' | 'Miscellaneous';

export interface BudgetRule {
  needs: number; // 50%
  wants: number; // 30%
  savings: number; // 20%
}

export interface MonthlyBudget {
  income: number;
  needs: number;
  wants: number;
  savings: number;
}

export interface CategoryMapping {
  [key: string]: 'needs' | 'wants' | 'savings';
}

export interface ExpenseStats {
  totalSpent: number;
  needsSpent: number;
  wantsSpent: number;
  savingsSpent: number;
  categoryBreakdown: Record<ExpenseCategory, number>;
}