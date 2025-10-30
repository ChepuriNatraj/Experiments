import React, { useState } from 'react';
import { Settings, DollarSign } from 'lucide-react';
import { MonthlyBudget } from '../types';
import { formatCurrency, defaultBudgetRule } from '../utils';

interface BudgetSettingsProps {
  budget: MonthlyBudget;
  onSetIncome: (income: number) => void;
  onUpdateBudget: (budget: Partial<MonthlyBudget>) => void;
}

export const BudgetSettings: React.FC<BudgetSettingsProps> = ({ budget, onSetIncome, onUpdateBudget }) => {
  const [income, setIncome] = useState(budget.income.toString());
  const [customBudget, setCustomBudget] = useState({
    needs: budget.needs.toString(),
    wants: budget.wants.toString(),
    savings: budget.savings.toString(),
  });
  const [useCustomBudget, setUseCustomBudget] = useState(false);

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncome = parseFloat(income);
    if (newIncome > 0) {
      onSetIncome(newIncome);
      if (!useCustomBudget) {
        // Update custom budget fields with calculated values
        setCustomBudget({
          needs: (newIncome * 0.5).toString(),
          wants: (newIncome * 0.3).toString(),
          savings: (newIncome * 0.2).toString(),
        });
      }
    }
  };

  const handleCustomBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget = {
      income: parseFloat(income),
      needs: parseFloat(customBudget.needs),
      wants: parseFloat(customBudget.wants),
      savings: parseFloat(customBudget.savings),
    };
    
    if (newBudget.needs >= 0 && newBudget.wants >= 0 && newBudget.savings >= 0) {
      onUpdateBudget(newBudget);
    }
  };

  const resetToDefault = () => {
    const incomeValue = parseFloat(income);
    if (incomeValue > 0) {
      setCustomBudget({
        needs: (incomeValue * 0.5).toString(),
        wants: (incomeValue * 0.3).toString(),
        savings: (incomeValue * 0.2).toString(),
      });
      setUseCustomBudget(false);
      onSetIncome(incomeValue);
    }
  };

  const totalBudget = parseFloat(customBudget.needs) + parseFloat(customBudget.wants) + parseFloat(customBudget.savings);
  const incomeValue = parseFloat(income);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-800">Budget Settings</h2>
        </div>

        {/* Monthly Income */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Income</h3>
          <form onSubmit={handleIncomeSubmit} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="Enter your monthly income"
                  min="0"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Update
            </button>
          </form>
          {budget.income > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Current income: {formatCurrency(budget.income)}
            </p>
          )}
        </div>

        {/* Budget Allocation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Budget Allocation</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={useCustomBudget}
                  onChange={(e) => setUseCustomBudget(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Custom Budget</span>
              </label>
              <button
                type="button"
                onClick={resetToDefault}
                className="text-sm text-primary-600 hover:text-primary-800 underline"
              >
                Reset to 50-30-20
              </button>
            </div>
          </div>

          {!useCustomBudget && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-blue-800 mb-2">50-30-20 Rule</h4>
              <p className="text-sm text-blue-700">
                This popular budgeting rule suggests allocating 50% of your income to needs, 
                30% to wants, and 20% to savings and debt repayment.
              </p>
            </div>
          )}

          <form onSubmit={handleCustomBudgetSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Needs (Food, College Expenses)
                </label>
                <input
                  type="number"
                  value={customBudget.needs}
                  onChange={(e) => setCustomBudget(prev => ({ ...prev, needs: e.target.value }))}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {incomeValue > 0 && `${((parseFloat(customBudget.needs) / incomeValue) * 100).toFixed(1)}% of income`}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wants (Snacks, Miscellaneous)
                </label>
                <input
                  type="number"
                  value={customBudget.wants}
                  onChange={(e) => setCustomBudget(prev => ({ ...prev, wants: e.target.value }))}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {incomeValue > 0 && `${((parseFloat(customBudget.wants) / incomeValue) * 100).toFixed(1)}% of income`}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Savings & Debt
                </label>
                <input
                  type="number"
                  value={customBudget.savings}
                  onChange={(e) => setCustomBudget(prev => ({ ...prev, savings: e.target.value }))}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {incomeValue > 0 && `${((parseFloat(customBudget.savings) / incomeValue) * 100).toFixed(1)}% of income`}
                </p>
              </div>
            </div>

            {/* Budget Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Total Budget:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(totalBudget)}</span>
              </div>
              {incomeValue > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {totalBudget > incomeValue ? 'Over budget by:' : 'Remaining:'}
                  </span>
                  <span className={`text-sm font-medium ${
                    totalBudget > incomeValue ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {formatCurrency(Math.abs(incomeValue - totalBudget))}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Save Budget Settings
            </button>
          </form>
        </div>

        {/* Current Budget Overview */}
        {budget.income > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">Current Budget</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Income</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(budget.income)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Needs</p>
                <p className="text-lg font-semibold text-blue-600">{formatCurrency(budget.needs)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Wants</p>
                <p className="text-lg font-semibold text-purple-600">{formatCurrency(budget.wants)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Savings</p>
                <p className="text-lg font-semibold text-green-600">{formatCurrency(budget.savings)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};