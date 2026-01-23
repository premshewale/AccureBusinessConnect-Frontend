import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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