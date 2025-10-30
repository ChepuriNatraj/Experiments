import React, { useState } from 'react';
import { Wallet, TrendingUp, PieChart, Plus, List } from 'lucide-react';
import { useExpenses, useBudget } from './hooks';
import { ExpenseForm } from './components/ExpenseForm';
import { Dashboard } from './components/Dashboard';
import { ExpenseList } from './components/ExpenseList';
import { BudgetSettings } from './components/BudgetSettings';

type ActiveTab = 'dashboard' | 'add' | 'history' | 'budget';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const { expenses, currentMonthExpenses, stats, addExpense, deleteExpense } = useExpenses();
  const { budget, setIncome, updateBudget } = useBudget();

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: TrendingUp },
    { id: 'add' as const, label: 'Add Expense', icon: Plus },
    { id: 'history' as const, label: 'History', icon: List },
    { id: 'budget' as const, label: 'Budget', icon: PieChart },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} budget={budget} expenses={currentMonthExpenses} />;
      case 'add':
        return <ExpenseForm onAddExpense={addExpense} />;
      case 'history':
        return <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />;
      case 'budget':
        return <BudgetSettings budget={budget} onSetIncome={setIncome} onUpdateBudget={updateBudget} />;
      default:
        return <Dashboard stats={stats} budget={budget} expenses={currentMonthExpenses} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Wallet className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Money Manager</h1>
            </div>
            <div className="text-sm text-gray-600">
              Total Spent This Month: ₹{stats.totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;