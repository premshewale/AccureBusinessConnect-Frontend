import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Initial static invoice data
const initialInvoices = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    customerId: 1,
    customerName: "Acme Corporation",
    customerEmail: "contact@acme.com",
    customerPhone: "+91 9876543210",
    customerAddress: "123 Business Street, Mumbai, Maharashtra 400001",
    issueDate: "2024-01-15",
    dueDate: "2024-02-14",
    items: [
      { id: 1, description: "Website Design", quantity: 1, unitPrice: 50000, amount: 50000 },
      { id: 2, description: "Domain Registration", quantity: 1, unitPrice: 1500, amount: 1500 },
      { id: 3, description: "Hosting (1 Year)", quantity: 1, unitPrice: 8000, amount: 8000 },
    ],
    subtotal: 59500,
    taxRate: 18,
    taxAmount: 10710,
    discount: 2000,
    totalAmount: 68210,
    amountPaid: 40000,
    dueAmount: 28210,
    status: "partial",
    paymentMethod: "Bank Transfer",
    paymentDate: "2024-01-20",
    transactionId: "TXN-001",
    notes: "Website development project phase 1",
    terms: "Payment due within 30 days. Late fees apply after due date.",
    createdBy: "John Doe",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    customerId: 2,
    customerName: "Tech Solutions Ltd",
    customerEmail: "accounts@techsolutions.com",
    customerPhone: "+91 8765432109",
    customerAddress: "456 Tech Park, Bangalore, Karnataka 560001",
    issueDate: "2024-01-10",
    dueDate: "2024-02-09",
    items: [
      { id: 1, description: "Mobile App Development", quantity: 1, unitPrice: 150000, amount: 150000 },
      { id: 2, description: "API Integration", quantity: 2, unitPrice: 25000, amount: 50000 },
    ],
    subtotal: 200000,
    taxRate: 18,
    taxAmount: 36000,
    discount: 10000,
    totalAmount: 226000,
    amountPaid: 226000,
    dueAmount: 0,
    status: "paid",
    paymentMethod: "Credit Card",
    paymentDate: "2024-01-12",
    transactionId: "TXN-002",
    notes: "Complete mobile app with backend integration",
    terms: "50% advance, 50% on delivery",
    createdBy: "Jane Smith",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    customerId: 3,
    customerName: "Global Retail Inc",
    customerEmail: "finance@globalretail.com",
    customerPhone: "+91 7654321098",
    customerAddress: "789 Mall Road, Delhi 110001",
    issueDate: "2024-01-05",
    dueDate: "2024-02-04",
    items: [
      { id: 1, description: "E-commerce Platform", quantity: 1, unitPrice: 250000, amount: 250000 },
      { id: 2, description: "Payment Gateway Setup", quantity: 1, unitPrice: 15000, amount: 15000 },
      { id: 3, description: "SSL Certificate", quantity: 1, unitPrice: 5000, amount: 5000 },
    ],
    subtotal: 270000,
    taxRate: 18,
    taxAmount: 48600,
    discount: 0,
    totalAmount: 318600,
    amountPaid: 0,
    dueAmount: 318600,
    status: "overdue",
    paymentMethod: "",
    paymentDate: "",
    transactionId: "",
    notes: "Complete e-commerce solution",
    terms: "Net 30 days",
    createdBy: "Mike Johnson",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    customerId: 4,
    customerName: "StartUp Innovations",
    customerEmail: "billing@startupinnovations.com",
    customerPhone: "+91 6543210987",
    customerAddress: "101 Innovation Hub, Hyderabad, Telangana 500001",
    issueDate: "2024-01-20",
    dueDate: "2024-02-19",
    items: [
      { id: 1, description: "Consulting Services", quantity: 40, unitPrice: 2000, amount: 80000 },
      { id: 2, description: "Software License", quantity: 5, unitPrice: 10000, amount: 50000 },
    ],
    subtotal: 130000,
    taxRate: 18,
    taxAmount: 23400,
    discount: 5000,
    totalAmount: 148400,
    amountPaid: 148400,
    dueAmount: 0,
    status: "paid",
    paymentMethod: "UPI",
    paymentDate: "2024-01-22",
    transactionId: "TXN-004",
    notes: "Monthly consulting and software",
    terms: "Payable on receipt",
    createdBy: "Sarah Williams",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-22",
  },
  {
    id: 5,
    invoiceNumber: "INV-2024-005",
    customerId: 5,
    customerName: "EduTech Solutions",
    customerEmail: "accounts@edutech.com",
    customerPhone: "+91 5432109876",
    customerAddress: "234 Education Street, Pune, Maharashtra 411001",
    issueDate: "2024-01-25",
    dueDate: "2024-02-24",
    items: [
      { id: 1, description: "LMS Platform", quantity: 1, unitPrice: 100000, amount: 100000 },
      { id: 2, description: "Customization", quantity: 20, unitPrice: 1500, amount: 30000 },
    ],
    subtotal: 130000,
    taxRate: 18,
    taxAmount: 23400,
    discount: 0,
    totalAmount: 153400,
    amountPaid: 50000,
    dueAmount: 103400,
    status: "partial",
    paymentMethod: "Bank Transfer",
    paymentDate: "2024-01-28",
    transactionId: "TXN-005",
    notes: "Learning Management System implementation",
    terms: "30% advance, 70% on completion",
    createdBy: "David Brown",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-28",
  },
];

// Create context
const InvoiceContext = createContext();

// Custom hook
const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
};

// Provider component
const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    try {
      const saved = localStorage.getItem('invoices');
      return saved ? JSON.parse(saved) : initialInvoices;
    } catch (error) {
      console.error('Error loading invoices from localStorage:', error);
      return initialInvoices;
    }
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('invoices', JSON.stringify(invoices));
    } catch (error) {
      console.error('Error saving invoices to localStorage:', error);
    }
  }, [invoices]);

  const generateUniqueId = useCallback(() => {
    return Date.now() + Math.floor(Math.random() * 1000);
  }, []);

  const generateInvoiceNumber = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const invoiceCount = invoices.filter(inv => 
      inv.invoiceNumber.includes(`INV-${currentYear}`)
    ).length + 1;
    return `INV-${currentYear}-${String(invoiceCount).padStart(3, '0')}`;
  }, [invoices]);

  const addInvoice = useCallback((invoiceData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          const newInvoice = {
            id: generateUniqueId(),
            invoiceNumber: generateInvoiceNumber(),
            ...invoiceData,
            subtotal: invoiceData.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0,
            taxAmount: invoiceData.taxRate ? 
              (invoiceData.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0) * (invoiceData.taxRate / 100) : 0,
            totalAmount: (invoiceData.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0) * 
              (1 + (invoiceData.taxRate || 0) / 100) - (invoiceData.discount || 0),
            dueAmount: ((invoiceData.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0) * 
              (1 + (invoiceData.taxRate || 0) / 100) - (invoiceData.discount || 0)) - (invoiceData.amountPaid || 0),
            status: invoiceData.amountPaid >= ((invoiceData.items?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0) * 
              (1 + (invoiceData.taxRate || 0) / 100) - (invoiceData.discount || 0)) ? "paid" : 
              invoiceData.amountPaid > 0 ? "partial" : "pending",
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            createdBy: invoiceData.createdBy || "Current User",
          };
          
          setInvoices(prev => [newInvoice, ...prev]);
          resolve(newInvoice);
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, [generateUniqueId, generateInvoiceNumber, invoices]);

  const updateInvoice = useCallback((id, invoiceData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setInvoices(prev => 
            prev.map(invoice => 
              invoice.id === id ? { 
                ...invoice, 
                ...invoiceData,
                updatedAt: new Date().toISOString().split('T')[0]
              } : invoice
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

  const deleteInvoice = useCallback((id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setInvoices(prev => prev.filter(invoice => invoice.id !== id));
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, []);

  const getInvoiceById = useCallback((id) => {
    return invoices.find(invoice => invoice.id === id);
  }, [invoices]);

  const getInvoicesByStatus = useCallback((status) => {
    return invoices.filter(invoice => invoice.status === status);
  }, [invoices]);

  const getInvoicesByCustomer = useCallback((customerId) => {
    return invoices.filter(invoice => invoice.customerId === customerId);
  }, [invoices]);

  const getInvoicesByDateRange = useCallback((startDate, endDate) => {
    return invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.issueDate);
      return invoiceDate >= new Date(startDate) && invoiceDate <= new Date(endDate);
    });
  }, [invoices]);

  const getInvoiceStats = useCallback(() => {
    const total = invoices.length;
    const paid = invoices.filter(i => i.status === 'paid').length;
    const pending = invoices.filter(i => i.status === 'pending').length;
    const partial = invoices.filter(i => i.status === 'partial').length;
    const overdue = invoices.filter(i => i.status === 'overdue').length;
    
    const totalAmount = invoices.reduce((sum, i) => sum + (i.totalAmount || 0), 0);
    const paidAmount = invoices.reduce((sum, i) => sum + (i.amountPaid || 0), 0);
    const dueAmount = invoices.reduce((sum, i) => sum + (i.dueAmount || 0), 0);
    const avgAmount = total > 0 ? Math.round(totalAmount / total) : 0;
    
    // Calculate monthly invoices
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthInvoices = invoices.filter(i => {
      const invoiceDate = new Date(i.issueDate);
      return invoiceDate.getMonth() === currentMonth && 
             invoiceDate.getFullYear() === currentYear;
    });
    const thisMonthAmount = thisMonthInvoices.reduce((sum, i) => sum + i.totalAmount, 0);
    
    // Calculate by customer
    const customerBreakdown = {};
    invoices.forEach(invoice => {
      const customer = invoice.customerName || 'Unknown';
      customerBreakdown[customer] = (customerBreakdown[customer] || 0) + 1;
    });
    
    return {
      total,
      paid,
      pending,
      partial,
      overdue,
      totalAmount,
      paidAmount,
      dueAmount,
      avgAmount,
      thisMonth: thisMonthInvoices.length,
      thisMonthAmount,
      customerBreakdown,
      topCustomers: Object.entries(customerBreakdown)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([customer, count]) => ({ customer, count }))
    };
  }, [invoices]);

  const getInvoiceSummary = useCallback(() => {
    const stats = getInvoiceStats();
    
    return {
      totalInvoices: stats.total,
      totalAmount: stats.totalAmount,
      totalPaid: stats.paidAmount,
      totalDue: stats.dueAmount,
      thisMonthTotal: stats.thisMonthAmount,
      topCustomer: stats.topCustomers[0]?.customer || 'N/A',
      collectionRate: stats.totalAmount > 0 ? Math.round((stats.paidAmount / stats.totalAmount) * 100) : 0,
    };
  }, [getInvoiceStats]);

  const value = {
    invoices,
    loading,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,
    getInvoicesByStatus,
    getInvoicesByCustomer,
    getInvoicesByDateRange,
    getInvoiceStats,
    getInvoiceSummary,
  };

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
};

export { InvoiceProvider, useInvoices };
export default InvoiceProvider;