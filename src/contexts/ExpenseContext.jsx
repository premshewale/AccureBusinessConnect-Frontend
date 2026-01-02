import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Initial static expense data
const initialExpenses = [
  {
    id: 1,
    title: "Office Supplies",
    description: "Purchase of stationery items",
    amount: 15000,
    category: "Office",
    date: "2024-01-15",
    vendor: "Stationery Mart",
    paymentMethod: "Credit Card",
    status: "approved",
    receiptNumber: "REC-001",
    createdBy: "John Doe",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Team Lunch",
    description: "Monthly team building lunch",
    amount: 8000,
    category: "Entertainment",
    date: "2024-01-14",
    vendor: "Food Paradise",
    paymentMethod: "Cash",
    status: "pending",
    receiptNumber: "REC-002",
    createdBy: "Jane Smith",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
  {
    id: 3,
    title: "Software Subscription",
    description: "Annual subscription for design tools",
    amount: 50000,
    category: "Software",
    date: "2024-01-10",
    vendor: "Adobe Inc",
    paymentMethod: "Bank Transfer",
    status: "approved",
    receiptNumber: "REC-003",
    createdBy: "Mike Johnson",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: 4,
    title: "Travel Expenses",
    description: "Client meeting travel costs",
    amount: 25000,
    category: "Travel",
    date: "2024-01-08",
    vendor: "Airline Corp",
    paymentMethod: "Corporate Card",
    status: "rejected",
    receiptNumber: "REC-004",
    createdBy: "Sarah Williams",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
  },
  {
    id: 5,
    title: "Marketing Materials",
    description: "Brochures and promotional items",
    amount: 12000,
    category: "Marketing",
    date: "2024-01-05",
    vendor: "Print Solutions",
    paymentMethod: "Cheque",
    status: "approved",
    receiptNumber: "REC-005",
    createdBy: "David Brown",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
  },
  {
    id: 6,
    title: "Internet Bill",
    description: "Monthly internet service charge",
    amount: 5000,
    category: "Utilities",
    date: "2024-01-03",
    vendor: "Internet Provider",
    paymentMethod: "Auto Debit",
    status: "approved",
    receiptNumber: "REC-006",
    createdBy: "Emily Davis",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
  {
    id: 7,
    title: "Training Workshop",
    description: "Employee skill development workshop",
    amount: 35000,
    category: "Training",
    date: "2024-01-02",
    vendor: "Skill Academy",
    paymentMethod: "Bank Transfer",
    status: "pending",
    receiptNumber: "REC-007",
    createdBy: "Robert Wilson",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02",
  },
  {
    id: 8,
    title: "Office Maintenance",
    description: "Monthly office cleaning and maintenance",
    amount: 10000,
    category: "Maintenance",
    date: "2024-01-01",
    vendor: "CleanCo Services",
    paymentMethod: "Cash",
    status: "approved",
    receiptNumber: "REC-008",
    createdBy: "Lisa Anderson",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 9,
    title: "Client Dinner",
    description: "Business dinner with important client",
    amount: 15000,
    category: "Entertainment",
    date: "2024-01-20",
    vendor: "Fine Dining Restaurant",
    paymentMethod: "Credit Card",
    status: "pending",
    receiptNumber: "REC-009",
    createdBy: "John Doe",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: 10,
    title: "New Laptop",
    description: "Purchase for new employee",
    amount: 75000,
    category: "Equipment",
    date: "2024-01-18",
    vendor: "Tech Store",
    paymentMethod: "Credit Card",
    status: "approved",
    receiptNumber: "REC-010",
    createdBy: "Jane Smith",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
];

// Create context
const ExpenseContext = createContext();

// Custom hook
const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

// Provider component
const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('expenses');
      return saved ? JSON.parse(saved) : initialExpenses;
    } catch (error) {
      console.error('Error loading expenses from localStorage:', error);
      return initialExpenses;
    }
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses to localStorage:', error);
    }
  }, [expenses]);

  const generateUniqueId = useCallback(() => {
    return Date.now() + Math.floor(Math.random() * 1000);
  }, []);

  const addExpense = useCallback((expenseData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          const newExpense = {
            id: generateUniqueId(),
            ...expenseData,
            amount: Number(expenseData.amount) || 0,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            status: expenseData.status || "pending",
            receiptNumber: expenseData.receiptNumber || `REC-${String(Date.now()).slice(-6)}`,
            createdBy: expenseData.createdBy || "Current User",
          };
          
          setExpenses(prev => [newExpense, ...prev]);
          resolve(newExpense);
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, [generateUniqueId]);

  const updateExpense = useCallback((id, expenseData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setExpenses(prev => 
            prev.map(expense => 
              expense.id === id ? { 
                ...expense, 
                ...expenseData,
                updatedAt: new Date().toISOString().split('T')[0]
              } : expense
            )
          );
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, []);

  const deleteExpense = useCallback((id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setExpenses(prev => prev.filter(expense => expense.id !== id));
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, []);

  const getExpenseById = useCallback((id) => {
    return expenses.find(expense => expense.id === id);
  }, [expenses]);

  const getExpensesByStatus = useCallback((status) => {
    return expenses.filter(expense => expense.status === status);
  }, [expenses]);

  const getExpensesByCategory = useCallback((category) => {
    return expenses.filter(expense => expense.category === category);
  }, [expenses]);

  const getExpensesByDateRange = useCallback((startDate, endDate) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
    });
  }, [expenses]);

  const getExpenseStats = useCallback(() => {
    const total = expenses.length;
    const approved = expenses.filter(e => e.status === 'approved').length;
    const pending = expenses.filter(e => e.status === 'pending').length;
    const rejected = expenses.filter(e => e.status === 'rejected').length;
    const totalAmount = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const avgAmount = total > 0 ? Math.round(totalAmount / total) : 0;
    
    // Calculate monthly expenses
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthExpenses = expenses.filter(e => {
      const expenseDate = new Date(e.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });
    const thisMonthAmount = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    // Calculate by category
    const categoryBreakdown = {};
    expenses.forEach(expense => {
      const category = expense.category || 'Uncategorized';
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + 1;
    });
    
    return {
      total,
      approved,
      pending,
      rejected,
      totalAmount,
      avgAmount,
      thisMonth: thisMonthExpenses.length,
      thisMonthAmount,
      categoryBreakdown,
      topCategories: Object.entries(categoryBreakdown)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([category, count]) => ({ category, count }))
    };
  }, [expenses]);

  const getExpenseSummary = useCallback(() => {
    const stats = getExpenseStats();
    
    return {
      totalExpenses: stats.total,
      totalAmount: stats.totalAmount,
      pendingApproval: stats.pending,
      thisMonthTotal: stats.thisMonthAmount,
      topCategory: stats.topCategories[0]?.category || 'N/A',
      approvalRate: stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0,
    };
  }, [getExpenseStats]);

  const value = {
    expenses,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    getExpensesByStatus,
    getExpensesByCategory,
    getExpensesByDateRange,
    getExpenseStats,
    getExpenseSummary,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseProvider, useExpenses };
export default ExpenseProvider;