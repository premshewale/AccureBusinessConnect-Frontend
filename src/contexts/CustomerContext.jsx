import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Initial static customer data
const initialCustomers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@techcorp.com",
    phone: "+91 98765 43210",
    company: "TechCorp Solutions",
    industry: "Technology",
    status: "active",
    source: "Website",
    totalValue: 250000,
    lastContact: "2024-01-15",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@healthplus.com",
    phone: "+91 87654 32109",
    company: "HealthPlus Clinics",
    industry: "Healthcare",
    status: "new",
    source: "Referral",
    totalValue: 150000,
    lastContact: "2024-01-14",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@finwise.com",
    phone: "+91 76543 21098",
    company: "FinWise Advisors",
    industry: "Finance",
    status: "active",
    source: "Email",
    totalValue: 500000,
    lastContact: "2024-01-13",
    createdAt: "2024-01-05",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha@retailmart.com",
    phone: "+91 65432 10987",
    company: "RetailMart Stores",
    industry: "Retail",
    status: "inactive",
    source: "Social Media",
    totalValue: 100000,
    lastContact: "2023-12-20",
    createdAt: "2023-12-15",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@manufacture.com",
    phone: "+91 54321 09876",
    company: "ManufacturePro Ltd",
    industry: "Manufacturing",
    status: "active",
    source: "Cold Call",
    totalValue: 750000,
    lastContact: "2024-01-14",
    createdAt: "2024-01-08",
  },
  {
    id: 6,
    name: "Anjali Mehta",
    email: "anjali@eduplus.com",
    phone: "+91 43210 98765",
    company: "EduPlus Academy",
    industry: "Education",
    status: "prospect",
    source: "Event",
    totalValue: 300000,
    lastContact: "2024-01-12",
    createdAt: "2024-01-10",
  },
  {
    id: 7,
    name: "Karthik Nair",
    email: "karthik@realtors.com",
    phone: "+91 32109 87654",
    company: "Prime Realtors",
    industry: "Real Estate",
    status: "active",
    source: "Website",
    totalValue: 1200000,
    lastContact: "2024-01-15",
    createdAt: "2024-01-03",
  },
  {
    id: 8,
    name: "Meera Joshi",
    email: "meera@hotelgroup.com",
    phone: "+91 21098 76543",
    company: "Grand Hotel Group",
    industry: "Hospitality",
    status: "new",
    source: "Referral",
    totalValue: 80000,
    lastContact: "2024-01-13",
    createdAt: "2024-01-11",
  },
];

const CustomerContext = createContext();

// Custom hook
const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

// Main Provider component
const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('customers');
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch (error) {
      console.error('Error loading customers from localStorage:', error);
      return initialCustomers;
    }
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('customers', JSON.stringify(customers));
    } catch (error) {
      console.error('Error saving customers to localStorage:', error);
    }
  }, [customers]);

  const generateUniqueId = useCallback(() => {
    return Date.now() + Math.floor(Math.random() * 1000);
  }, []);

  const addCustomer = useCallback((customerData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          const newCustomer = {
            id: generateUniqueId(),
            ...customerData,
            totalValue: customerData.totalValue || 0,
            lastContact: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString().split('T')[0],
            status: customerData.status || "new",
          };
          
          setCustomers(prev => [newCustomer, ...prev]);
          resolve(newCustomer);
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, [generateUniqueId]);

  const updateCustomer = useCallback((id, customerData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setCustomers(prev => 
            prev.map(customer => 
              customer.id === id ? { 
                ...customer, 
                ...customerData,
                updatedAt: new Date().toISOString().split('T')[0]
              } : customer
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

  const deleteCustomer = useCallback((id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setCustomers(prev => prev.filter(customer => customer.id !== id));
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, []);

  const getCustomerById = useCallback((id) => {
    return customers.find(customer => customer.id === id);
  }, [customers]);

  const getCustomersByStatus = useCallback((status) => {
    return customers.filter(customer => customer.status === status);
  }, [customers]);

  const getCustomersByIndustry = useCallback((industry) => {
    return customers.filter(customer => customer.industry === industry);
  }, [customers]);

  const getCustomerStats = useCallback(() => {
    const total = customers.length;
    const active = customers.filter(c => c.status === 'active').length;
    const newCustomers = customers.filter(c => c.status === 'new').length;
    const inactive = customers.filter(c => c.status === 'inactive').length;
    const prospect = customers.filter(c => c.status === 'prospect').length;
    const totalValue = customers.reduce((sum, c) => sum + (c.totalValue || 0), 0);
    const avgValue = total > 0 ? Math.round(totalValue / total) : 0;
    
    return {
      total,
      active,
      new: newCustomers,
      inactive,
      prospect,
      totalValue,
      avgValue,
    };
  }, [customers]);

  const value = {
    customers,
    loading,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    getCustomersByStatus,
    getCustomersByIndustry,
    getCustomerStats,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerProvider, useCustomers };
export default CustomerProvider;