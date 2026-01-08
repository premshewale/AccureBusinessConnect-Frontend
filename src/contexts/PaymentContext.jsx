import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Initial static payment data
const initialPayments = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    customerId: 1,
    customerName: "Rajesh Kumar",
    amount: 25000,
    amountPaid: 25000,
    dueAmount: 0,
    paymentDate: "2024-01-15",
    paymentMethod: "Bank Transfer",
    status: "paid",
    transactionId: "TXN-001",
    paymentType: "full",
    notes: "Payment received on time",
    createdBy: "John Doe",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    customerId: 2,
    customerName: "Priya Sharma",
    amount: 15000,
    amountPaid: 10000,
    dueAmount: 5000,
    paymentDate: "2024-01-14",
    paymentMethod: "Credit Card",
    status: "partial",
    transactionId: "TXN-002",
    paymentType: "installment",
    notes: "First installment paid",
    createdBy: "Jane Smith",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    customerId: 3,
    customerName: "Amit Patel",
    amount: 50000,
    amountPaid: 50000,
    dueAmount: 0,
    paymentDate: "2024-01-13",
    paymentMethod: "UPI",
    status: "paid",
    transactionId: "TXN-003",
    paymentType: "full",
    notes: "Quick payment via UPI",
    createdBy: "Mike Johnson",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    customerId: 4,
    customerName: "Sneha Reddy",
    amount: 100000,
    amountPaid: 0,
    dueAmount: 100000,
    paymentDate: "2024-01-20",
    paymentMethod: "Cheque",
    status: "pending",
    transactionId: "TXN-004",
    paymentType: "full",
    notes: "Payment expected by end of month",
    createdBy: "Sarah Williams",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: 5,
    invoiceNumber: "INV-2024-005",
    customerId: 5,
    customerName: "Vikram Singh",
    amount: 75000,
    amountPaid: 50000,
    dueAmount: 25000,
    paymentDate: "2024-01-12",
    paymentMethod: "Bank Transfer",
    status: "partial",
    transactionId: "TXN-005",
    paymentType: "installment",
    notes: "Second installment due next month",
    createdBy: "David Brown",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: 6,
    invoiceNumber: "INV-2024-006",
    customerId: 6,
    customerName: "Anjali Mehta",
    amount: 30000,
    amountPaid: 30000,
    dueAmount: 0,
    paymentDate: "2024-01-11",
    paymentMethod: "Cash",
    status: "paid",
    transactionId: "TXN-006",
    paymentType: "full",
    notes: "Cash payment at office",
    createdBy: "Emily Davis",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
  },
  {
    id: 7,
    invoiceNumber: "INV-2024-007",
    customerId: 7,
    customerName: "Karthik Nair",
    amount: 120000,
    amountPaid: 60000,
    dueAmount: 60000,
    paymentDate: "2024-01-09",
    paymentMethod: "Credit Card",
    status: "partial",
    transactionId: "TXN-007",
    paymentType: "installment",
    notes: "50% advance payment",
    createdBy: "Robert Wilson",
    createdAt: "2024-01-09",
    updatedAt: "2024-01-09",
  },
  {
    id: 8,
    invoiceNumber: "INV-2024-008",
    customerId: 8,
    customerName: "Meera Joshi",
    amount: 80000,
    amountPaid: 80000,
    dueAmount: 0,
    paymentDate: "2024-01-08",
    paymentMethod: "Bank Transfer",
    status: "paid",
    transactionId: "TXN-008",
    paymentType: "full",
    notes: "Payment confirmed",
    createdBy: "Lisa Anderson",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
  },
  {
    id: 9,
    invoiceNumber: "INV-2024-009",
    customerId: 1,
    customerName: "Rajesh Kumar",
    amount: 45000,
    amountPaid: 0,
    dueAmount: 45000,
    paymentDate: "2024-02-01",
    paymentMethod: "UPI",
    status: "overdue",
    transactionId: "TXN-009",
    paymentType: "full",
    notes: "Payment overdue by 5 days",
    createdBy: "John Doe",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
  },
  {
    id: 10,
    invoiceNumber: "INV-2024-010",
    customerId: 3,
    customerName: "Amit Patel",
    amount: 35000,
    amountPaid: 35000,
    dueAmount: 0,
    paymentDate: "2024-01-05",
    paymentMethod: "Cheque",
    status: "paid",
    transactionId: "TXN-010",
    paymentType: "full",
    notes: "Cheque cleared",
    createdBy: "Mike Johnson",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-07",
  },
];

// Create context
const PaymentContext = createContext();

// Custom hook
const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayments must be used within a PaymentProvider');
  }
  return context;
};

// Provider component
const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('payments');
      return saved ? JSON.parse(saved) : initialPayments;
    } catch (error) {
      console.error('Error loading payments from localStorage:', error);
      return initialPayments;
    }
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('payments', JSON.stringify(payments));
    } catch (error) {
      console.error('Error saving payments to localStorage:', error);
    }
  }, [payments]);

  const generateUniqueId = useCallback(() => {
    return Date.now() + Math.floor(Math.random() * 1000);
  }, []);

  const generateInvoiceNumber = useCallback(() => {
    const prefix = "INV";
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}-${random}`;
  }, []);

  const generateTransactionId = useCallback(() => {
    const prefix = "TXN";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}-${timestamp}${random}`;
  }, []);

  const addPayment = useCallback((paymentData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          const dueAmount = paymentData.amount - (paymentData.amountPaid || 0);
          const status = dueAmount === 0 ? 'paid' : 
                        dueAmount === paymentData.amount ? 'pending' : 'partial';
          
          const newPayment = {
            id: generateUniqueId(),
            invoiceNumber: paymentData.invoiceNumber || generateInvoiceNumber(),
            transactionId: paymentData.transactionId || generateTransactionId(),
            ...paymentData,
            amount: Number(paymentData.amount) || 0,
            amountPaid: Number(paymentData.amountPaid) || 0,
            dueAmount: dueAmount,
            status: status,
            paymentDate: paymentData.paymentDate || new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            createdBy: paymentData.createdBy || "Current User",
          };
          
          setPayments(prev => [newPayment, ...prev]);
          resolve(newPayment);
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, [generateUniqueId, generateInvoiceNumber, generateTransactionId]);

  const updatePayment = useCallback((id, paymentData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setPayments(prev => 
            prev.map(payment => {
              if (payment.id === id) {
                const updatedPayment = { ...payment, ...paymentData };
                // Recalculate due amount and status
                const dueAmount = updatedPayment.amount - updatedPayment.amountPaid;
                updatedPayment.dueAmount = dueAmount;
                updatedPayment.status = dueAmount === 0 ? 'paid' : 
                                      dueAmount === updatedPayment.amount ? 'pending' : 'partial';
                updatedPayment.updatedAt = new Date().toISOString().split('T')[0];
                return updatedPayment;
              }
              return payment;
            })
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

  const deletePayment = useCallback((id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setPayments(prev => prev.filter(payment => payment.id !== id));
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, []);

  const getPaymentById = useCallback((id) => {
    return payments.find(payment => payment.id === id);
  }, [payments]);

  const getPaymentsByStatus = useCallback((status) => {
    return payments.filter(payment => payment.status === status);
  }, [payments]);

  const getPaymentsByCustomer = useCallback((customerId) => {
    return payments.filter(payment => payment.customerId === customerId);
  }, [payments]);

  const getPaymentsByPaymentMethod = useCallback((paymentMethod) => {
    return payments.filter(payment => payment.paymentMethod === paymentMethod);
  }, [payments]);

  const getPaymentsByDateRange = useCallback((startDate, endDate) => {
    return payments.filter(payment => {
      const paymentDate = new Date(payment.paymentDate);
      return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
    });
  }, [payments]);

  const getPaymentStats = useCallback(() => {
    const total = payments.length;
    const paid = payments.filter(p => p.status === 'paid').length;
    const pending = payments.filter(p => p.status === 'pending').length;
    const partial = payments.filter(p => p.status === 'partial').length;
    const overdue = payments.filter(p => p.status === 'overdue').length;
    
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalPaid = payments.reduce((sum, p) => sum + p.amountPaid, 0);
    const totalDue = payments.reduce((sum, p) => sum + p.dueAmount, 0);
    
    // Calculate this month's payments
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthPayments = payments.filter(p => {
      const paymentDate = new Date(p.paymentDate);
      return paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear;
    });
    
    const thisMonthAmount = thisMonthPayments.reduce((sum, p) => sum + p.amountPaid, 0);
    
    // Calculate payment methods breakdown
    const paymentMethodBreakdown = {};
    payments.forEach(payment => {
      const method = payment.paymentMethod || 'Unknown';
      paymentMethodBreakdown[method] = (paymentMethodBreakdown[method] || 0) + 1;
    });
    
    // Calculate customer payment summary
    const customerPayments = {};
    payments.forEach(payment => {
      const customer = payment.customerName;
      if (!customerPayments[customer]) {
        customerPayments[customer] = { total: 0, paid: 0, due: 0 };
      }
      customerPayments[customer].total += payment.amount;
      customerPayments[customer].paid += payment.amountPaid;
      customerPayments[customer].due += payment.dueAmount;
    });
    
    // Get top paying customers
    const topCustomers = Object.entries(customerPayments)
      .sort(([,a], [,b]) => b.paid - a.paid)
      .slice(0, 5)
      .map(([customer, data]) => ({ 
        customer, 
        total: data.total, 
        paid: data.paid, 
        due: data.due 
      }));
    
    return {
      total,
      paid,
      pending,
      partial,
      overdue,
      totalAmount,
      totalPaid,
      totalDue,
      thisMonth: thisMonthPayments.length,
      thisMonthAmount,
      paymentMethodBreakdown,
      topCustomers,
      collectionRate: totalAmount > 0 ? Math.round((totalPaid / totalAmount) * 100) : 0,
      avgPayment: total > 0 ? Math.round(totalPaid / total) : 0,
    };
  }, [payments]);

  const getPaymentSummary = useCallback(() => {
    const stats = getPaymentStats();
    
    return {
      totalPayments: stats.total,
      totalCollected: stats.totalPaid,
      pendingCollection: stats.totalDue,
      collectionRate: stats.collectionRate,
      thisMonthCollection: stats.thisMonthAmount,
      overduePayments: stats.overdue,
      topPayingCustomer: stats.topCustomers[0]?.customer || 'N/A',
    };
  }, [getPaymentStats]);

  const markPaymentAsPaid = useCallback((id) => {
    return updatePayment(id, { 
      amountPaid: payments.find(p => p.id === id)?.amount || 0,
      status: 'paid',
      paymentDate: new Date().toISOString().split('T')[0]
    });
  }, [payments, updatePayment]);

  const value = {
    payments,
    loading,
    addPayment,
    updatePayment,
    deletePayment,
    getPaymentById,
    getPaymentsByStatus,
    getPaymentsByCustomer,
    getPaymentsByPaymentMethod,
    getPaymentsByDateRange,
    getPaymentStats,
    getPaymentSummary,
    markPaymentAsPaid,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentProvider, usePayments };
export default PaymentProvider;