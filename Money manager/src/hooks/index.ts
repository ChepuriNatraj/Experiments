import { useState, useEffect } from 'react';
import { Expense, MonthlyBudget } from '../types';
import { STORAGE_KEYS, generateId, getCurrentMonthExpenses, calculateExpenseStats } from '../utils';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Load expenses from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      if (stored) {
        setExpenses(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    }
  }, [expenses, loading]);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateId(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const currentMonthExpenses = getCurrentMonthExpenses(expenses);
  const stats = calculateExpenseStats(currentMonthExpenses);

  return {
    expenses,
    currentMonthExpenses,
    stats,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};

export const useBudget = () => {
  const [budget, setBudget] = useState<MonthlyBudget>({
    income: 0,
    needs: 0,
    wants: 0,
    savings: 0,
  });
  const [loading, setLoading] = useState(true);

  // Load budget from localStorage on mount
  useEffect(() => {
    try {
      const storedIncome = localStorage.getItem(STORAGE_KEYS.INCOME);
      const storedBudget = localStorage.getItem(STORAGE_KEYS.BUDGET);
      
      const income = storedIncome ? parseFloat(storedIncome) : 0;
      if (storedBudget) {
        setBudget(JSON.parse(storedBudget));
      } else if (income > 0) {
        // Calculate default budget based on 50-30-20 rule
        setBudget({
          income,
          needs: income * 0.5,
          wants: income * 0.3,
          savings: income * 0.2,
        });
      }
    } catch (error) {
      console.error('Error loading budget:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save budget to localStorage whenever budget changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(budget));
      localStorage.setItem(STORAGE_KEYS.INCOME, budget.income.toString());
    }
  }, [budget, loading]);

  const updateBudget = (newBudget: Partial<MonthlyBudget>) => {
    setBudget(prev => ({ ...prev, ...newBudget }));
  };

  const setIncome = (income: number) => {
    const newBudget = {
      income,
      needs: income * 0.5,
      wants: income * 0.3,
      savings: income * 0.2,
    };
    setBudget(newBudget);
  };

  return {
    budget,
    loading,
    updateBudget,
    setIncome,
  };
};