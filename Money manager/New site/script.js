// Data Storage
class ExpenseManager {
    constructor() {
        this.expenses = this.loadExpenses();
        this.budget = this.loadBudget();
        this.categoryMapping = {
            'Food': 'needs',
            'College Expenses': 'needs',
            'Snacks': 'wants',
            'Miscellaneous': 'wants'
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDashboard();
        this.updateBudgetDisplay();
        this.renderExpenseHistory();
        this.setDefaultDate();
    }

    // Local Storage Methods
    loadExpenses() {
        const stored = localStorage.getItem('money-manager-expenses');
        return stored ? JSON.parse(stored) : [];
    }

    saveExpenses() {
        localStorage.setItem('money-manager-expenses', JSON.stringify(this.expenses));
    }

    loadBudget() {
        const stored = localStorage.getItem('money-manager-budget');
        return stored ? JSON.parse(stored) : { income: 0, needs: 0, wants: 0, savings: 0 };
    }

    saveBudget() {
        localStorage.setItem('money-manager-budget', JSON.stringify(this.budget));
    }

    // Event Listeners
    setupEventListeners() {
        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Expense Form
        document.getElementById('expense-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });

        // Income Form
        document.getElementById('income-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateIncome();
        });

        // Search and Filter
        document.getElementById('search-expenses').addEventListener('input', () => {
            this.renderExpenseHistory();
        });

        document.getElementById('filter-category').addEventListener('change', () => {
            this.renderExpenseHistory();
        });

        document.getElementById('sort-expenses').addEventListener('change', () => {
            this.renderExpenseHistory();
        });
    }

    // Tab Management
    switchTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }

    // Utility Methods
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('expense-date').value = today;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatCurrency(amount) {
        return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Expense Management
    addExpense() {
        const form = document.getElementById('expense-form');
        const formData = new FormData(form);
        
        const expense = {
            id: this.generateId(),
            date: document.getElementById('expense-date').value,
            amount: parseFloat(document.getElementById('expense-amount').value),
            category: document.getElementById('expense-category').value,
            description: document.getElementById('expense-description').value,
            paymentMethod: document.getElementById('payment-method').value
        };

        if (!expense.date || !expense.amount || !expense.category || !expense.description) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        this.expenses.unshift(expense);
        this.saveExpenses();
        
        // Reset form
        form.reset();
        this.setDefaultDate();
        
        // Update displays
        this.updateDashboard();
        this.renderExpenseHistory();
        
        this.showToast('Expense added successfully!');
    }

    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(expense => expense.id !== id);
            this.saveExpenses();
            this.updateDashboard();
            this.renderExpenseHistory();
            this.showToast('Expense deleted successfully!');
        }
    }

    // Budget Management
    updateIncome() {
        const income = parseFloat(document.getElementById('monthly-income-input').value);
        
        if (income <= 0) {
            this.showToast('Please enter a valid income amount', 'error');
            return;
        }

        this.budget = {
            income: income,
            needs: income * 0.5,
            wants: income * 0.3,
            savings: income * 0.2
        };

        this.saveBudget();
        this.updateDashboard();
        this.updateBudgetDisplay();
        
        document.getElementById('monthly-income-input').value = '';
        this.showToast('Income updated successfully!');
    }

    // Calculation Methods
    getCurrentMonthExpenses() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        return this.expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === currentMonth && 
                   expenseDate.getFullYear() === currentYear;
        });
    }

    calculateStats() {
        const currentExpenses = this.getCurrentMonthExpenses();
        
        const stats = {
            totalSpent: 0,
            needsSpent: 0,
            wantsSpent: 0,
            savingsSpent: 0,
            categoryBreakdown: {
                'Food': 0,
                'Snacks': 0,
                'College Expenses': 0,
                'Miscellaneous': 0
            },
            expenseCount: currentExpenses.length
        };

        currentExpenses.forEach(expense => {
            stats.totalSpent += expense.amount;
            stats.categoryBreakdown[expense.category] += expense.amount;
            
            const budgetCategory = this.categoryMapping[expense.category];
            if (budgetCategory === 'needs') {
                stats.needsSpent += expense.amount;
            } else if (budgetCategory === 'wants') {
                stats.wantsSpent += expense.amount;
            }
        });

        return stats;
    }

    calculateBudgetStatus() {
        const stats = this.calculateStats();
        
        return {
            needs: {
                spent: stats.needsSpent,
                budget: this.budget.needs,
                percentage: this.budget.needs > 0 ? (stats.needsSpent / this.budget.needs) * 100 : 0,
                remaining: Math.max(0, this.budget.needs - stats.needsSpent)
            },
            wants: {
                spent: stats.wantsSpent,
                budget: this.budget.wants,
                percentage: this.budget.wants > 0 ? (stats.wantsSpent / this.budget.wants) * 100 : 0,
                remaining: Math.max(0, this.budget.wants - stats.wantsSpent)
            },
            savings: {
                spent: stats.savingsSpent,
                budget: this.budget.savings,
                percentage: this.budget.savings > 0 ? (stats.savingsSpent / this.budget.savings) * 100 : 0,
                remaining: Math.max(0, this.budget.savings - stats.savingsSpent)
            }
        };
    }

    // Display Updates
    updateDashboard() {
        const stats = this.calculateStats();
        const budgetStatus = this.calculateBudgetStatus();

        // Update overview cards
        document.getElementById('total-spent').textContent = this.formatCurrency(stats.totalSpent);
        document.getElementById('budget-remaining').textContent = this.formatCurrency(Math.max(0, this.budget.income - stats.totalSpent));
        document.getElementById('expense-count').textContent = stats.expenseCount;
        document.getElementById('monthly-income').textContent = this.formatCurrency(this.budget.income);

        // Update budget progress
        this.updateBudgetProgress('needs', budgetStatus.needs);
        this.updateBudgetProgress('wants', budgetStatus.wants);
        this.updateBudgetProgress('savings', budgetStatus.savings);

        // Update category breakdown
        Object.entries(stats.categoryBreakdown).forEach(([category, amount]) => {
            const elementId = category.toLowerCase().replace(' ', '-') === 'college-expenses' ? 'college' : 
                            category.toLowerCase().replace(' ', '-');
            const element = document.getElementById(`${elementId}-amount`);
            if (element) {
                element.textContent = this.formatCurrency(amount);
            }
        });

        // Update recent expenses
        this.updateRecentExpenses();
    }

    updateBudgetProgress(category, data) {
        const percentage = Math.min(data.percentage, 100);
        
        document.getElementById(`${category}-amount`).textContent = 
            `${this.formatCurrency(data.spent)} / ${this.formatCurrency(data.budget)}`;
        
        document.getElementById(`${category}-progress`).style.width = `${percentage}%`;
        
        document.getElementById(`${category}-percentage`).textContent = 
            `${data.percentage.toFixed(1)}% used${data.remaining > 0 ? ` • ${this.formatCurrency(data.remaining)} remaining` : ''}`;
    }

    updateBudgetDisplay() {
        document.getElementById('current-income-display').textContent = this.formatCurrency(this.budget.income);
        document.getElementById('needs-allocation').textContent = this.formatCurrency(this.budget.needs);
        document.getElementById('wants-allocation').textContent = this.formatCurrency(this.budget.wants);
        document.getElementById('savings-allocation').textContent = this.formatCurrency(this.budget.savings);
    }

    updateRecentExpenses() {
        const recentExpenses = this.getCurrentMonthExpenses().slice(0, 5);
        const container = document.getElementById('recent-expenses-list');
        
        if (recentExpenses.length === 0) {
            container.innerHTML = '<p class="no-data">No expenses yet. Add your first expense!</p>';
            return;
        }

        container.innerHTML = recentExpenses.map(expense => `
            <div class="expense-item">
                <div class="expense-details">
                    <h4>${expense.description}</h4>
                    <div class="expense-meta">
                        ${expense.category} • ${this.formatDate(expense.date)}
                    </div>
                </div>
                <div class="expense-amount">${this.formatCurrency(expense.amount)}</div>
            </div>
        `).join('');
    }

    // Expense History
    renderExpenseHistory() {
        const searchTerm = document.getElementById('search-expenses').value.toLowerCase();
        const filterCategory = document.getElementById('filter-category').value;
        const sortBy = document.getElementById('sort-expenses').value;

        let filteredExpenses = this.expenses.filter(expense => {
            const matchesSearch = expense.description.toLowerCase().includes(searchTerm) ||
                                expense.category.toLowerCase().includes(searchTerm);
            const matchesCategory = !filterCategory || expense.category === filterCategory;
            return matchesSearch && matchesCategory;
        });

        // Sort expenses
        filteredExpenses.sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                case 'amount':
                    return b.amount - a.amount;
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

        const container = document.getElementById('expense-list');
        
        if (filteredExpenses.length === 0) {
            container.innerHTML = '<p class="no-data">No expenses found matching your criteria.</p>';
            return;
        }

        container.innerHTML = filteredExpenses.map(expense => `
            <div class="expense-list-item">
                <div class="expense-info">
                    <h4>${expense.description}</h4>
                    <div class="expense-meta">
                        <span class="expense-badge">${expense.category}</span>
                        ${this.formatDate(expense.date)} • ${expense.paymentMethod}
                    </div>
                </div>
                <div class="expense-actions">
                    <span class="expense-amount">${this.formatCurrency(expense.amount)}</span>
                    <button class="delete-btn" onclick="expenseManager.deleteExpense('${expense.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.expenseManager = new ExpenseManager();
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}