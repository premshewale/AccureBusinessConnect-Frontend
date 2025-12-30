import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Initial static ticket data
const initialTickets = [
  {
    id: 1,
    title: "Login Issue",
    description: "Users unable to login to the portal",
    priority: "high",
    status: "open",
    type: "technical",
    assignee: "John Doe",
    reporter: "Rajesh Kumar",
    customerId: 1,
    customerName: "Rajesh Kumar",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
    dueDate: "2024-01-20",
  },
  {
    id: 2,
    title: "Payment Gateway Error",
    description: "Payment failing for some customers",
    priority: "high",
    status: "in_progress",
    type: "billing",
    assignee: "Jane Smith",
    reporter: "Priya Sharma",
    customerId: 2,
    customerName: "Priya Sharma",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-14",
    dueDate: "2024-01-18",
  },
  {
    id: 3,
    title: "Dashboard Loading Slow",
    description: "Dashboard takes too long to load data",
    priority: "medium",
    status: "open",
    type: "performance",
    assignee: "Mike Johnson",
    reporter: "Amit Patel",
    customerId: 3,
    customerName: "Amit Patel",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-10",
    dueDate: "2024-01-25",
  },
  {
    id: 4,
    title: "Email Notifications Not Working",
    description: "Users not receiving email notifications",
    priority: "medium",
    status: "resolved",
    type: "technical",
    assignee: "Sarah Williams",
    reporter: "Sneha Reddy",
    customerId: 4,
    customerName: "Sneha Reddy",
    createdAt: "2023-12-15",
    updatedAt: "2024-01-05",
    dueDate: "2024-01-10",
  },
  {
    id: 5,
    title: "Mobile App Crash",
    description: "App crashes on iOS when opening settings",
    priority: "high",
    status: "in_progress",
    type: "bug",
    assignee: "David Brown",
    reporter: "Vikram Singh",
    customerId: 5,
    customerName: "Vikram Singh",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-14",
    dueDate: "2024-01-22",
  },
  {
    id: 6,
    title: "Feature Request: Dark Mode",
    description: "Add dark mode option to the application",
    priority: "low",
    status: "open",
    type: "feature",
    assignee: "Emily Davis",
    reporter: "Anjali Mehta",
    customerId: 6,
    customerName: "Anjali Mehta",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    dueDate: "2024-02-15",
  },
  {
    id: 7,
    title: "API Rate Limit Issue",
    description: "API returning 429 too many requests error",
    priority: "medium",
    status: "open",
    type: "technical",
    assignee: "Robert Wilson",
    reporter: "Karthik Nair",
    customerId: 7,
    customerName: "Karthik Nair",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-15",
    dueDate: "2024-01-30",
  },
  {
    id: 8,
    title: "Report Generation Error",
    description: "Monthly reports failing to generate",
    priority: "medium",
    status: "closed",
    type: "reporting",
    assignee: "Lisa Anderson",
    reporter: "Meera Joshi",
    customerId: 8,
    customerName: "Meera Joshi",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-16",
    dueDate: "2024-01-20",
  },
];

// Create context
const TicketContext = createContext();

// Custom hook
const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

// Provider component
const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('tickets');
      return saved ? JSON.parse(saved) : initialTickets;
    } catch (error) {
      console.error('Error loading tickets from localStorage:', error);
      return initialTickets;
    }
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('tickets', JSON.stringify(tickets));
    } catch (error) {
      console.error('Error saving tickets to localStorage:', error);
    }
  }, [tickets]);

  const generateUniqueId = useCallback(() => {
    return Date.now() + Math.floor(Math.random() * 1000);
  }, []);

  const addTicket = useCallback((ticketData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          const newTicket = {
            id: generateUniqueId(),
            ...ticketData,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            status: ticketData.status || "open",
          };
          
          setTickets(prev => [newTicket, ...prev]);
          resolve(newTicket);
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, [generateUniqueId]);

  const updateTicket = useCallback((id, ticketData) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setTickets(prev => 
            prev.map(ticket => 
              ticket.id === id ? { 
                ...ticket, 
                ...ticketData,
                updatedAt: new Date().toISOString().split('T')[0]
              } : ticket
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

  const deleteTicket = useCallback((id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      
      setTimeout(() => {
        try {
          setTickets(prev => prev.filter(ticket => ticket.id !== id));
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    });
  }, []);

  const getTicketById = useCallback((id) => {
    return tickets.find(ticket => ticket.id === id);
  }, [tickets]);

  const getTicketsByStatus = useCallback((status) => {
    return tickets.filter(ticket => ticket.status === status);
  }, [tickets]);

  const getTicketsByPriority = useCallback((priority) => {
    return tickets.filter(ticket => ticket.priority === priority);
  }, [tickets]);

  const getTicketsByAssignee = useCallback((assignee) => {
    return tickets.filter(ticket => ticket.assignee === assignee);
  }, [tickets]);

  const getTicketStats = useCallback(() => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open').length;
    const inProgress = tickets.filter(t => t.status === 'in_progress').length;
    const resolved = tickets.filter(t => t.status === 'resolved').length;
    const closed = tickets.filter(t => t.status === 'closed').length;
    const highPriority = tickets.filter(t => t.priority === 'high').length;
    
    return {
      total,
      open,
      inProgress,
      resolved,
      closed,
      highPriority,
      avgResolutionTime: 24,
    };
  }, [tickets]);

  const value = {
    tickets,
    loading,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    getTicketsByStatus,
    getTicketsByPriority,
    getTicketsByAssignee,
    getTicketStats,
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};

export { TicketProvider, useTickets };
export default TicketProvider;