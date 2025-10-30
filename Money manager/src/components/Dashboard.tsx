import React from 'react';
import { TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';
import { ExpenseStats, MonthlyBudget, Expense } from '../types';
import { formatCurrency, calculateBudgetStatus, getProgressColor, getStatusColor } from '../utils';

interface DashboardProps {
  stats: ExpenseStats;
  budget: MonthlyBudget;
  expenses: Expense[];
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, budget, expenses }) => {
  const budgetStatus = calculateBudgetStatus(stats, budget);
  const currentMonth = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-600">{currentMonth}</p>
          </div>
          <Calendar className="w-8 h-8 text-primary-600" />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSpent)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Remaining</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(Math.max(0, budget.income - stats.totalSpent))}
              </p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expenses Count</p>
              <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Income</p>
              <p className="text-2xl font-bold text-indigo-600">{formatCurrency(budget.income)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* 50-30-20 Rule Tracking */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">50-30-20 Budget Rule</h3>
        <div className="space-y-4">
          {/* Needs (50%) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Needs (50%)</span>
              <span className={`text-sm font-medium ${getStatusColor(budgetStatus.needs.percentage)}`}>
                {formatCurrency(budgetStatus.needs.spent)} / {formatCurrency(budgetStatus.needs.budget)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(budgetStatus.needs.percentage)}`}
                style={{ width: `${Math.min(budgetStatus.needs.percentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {budgetStatus.needs.percentage.toFixed(1)}% used
              {budgetStatus.needs.remaining > 0 && ` • ${formatCurrency(budgetStatus.needs.remaining)} remaining`}
            </p>
          </div>

          {/* Wants (30%) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Wants (30%)</span>
              <span className={`text-sm font-medium ${getStatusColor(budgetStatus.wants.percentage)}`}>
                {formatCurrency(budgetStatus.wants.spent)} / {formatCurrency(budgetStatus.wants.budget)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(budgetStatus.wants.percentage)}`}
                style={{ width: `${Math.min(budgetStatus.wants.percentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {budgetStatus.wants.percentage.toFixed(1)}% used
              {budgetStatus.wants.remaining > 0 && ` • ${formatCurrency(budgetStatus.wants.remaining)} remaining`}
            </p>
          </div>

          {/* Savings (20%) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Savings (20%)</span>
              <span className={`text-sm font-medium ${getStatusColor(budgetStatus.savings.percentage)}`}>
                {formatCurrency(budgetStatus.savings.spent)} / {formatCurrency(budgetStatus.savings.budget)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(budgetStatus.savings.percentage)}`}
                style={{ width: `${Math.min(budgetStatus.savings.percentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {budgetStatus.savings.percentage.toFixed(1)}% used
              {budgetStatus.savings.remaining > 0 && ` • ${formatCurrency(budgetStatus.savings.remaining)} remaining`}
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Breakdown</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(stats.categoryBreakdown).map(([category, amount]) => (
            <div key={category} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</p>
              <p className="text-sm text-gray-600">{category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Expenses */}
      {recentExpenses.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Expenses</h3>
          <div className="space-y-3">
            {recentExpenses.map(expense => (
              <div key={expense.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-500">{expense.category} • {new Date(expense.date).toLocaleDateString('en-IN')}</p>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};