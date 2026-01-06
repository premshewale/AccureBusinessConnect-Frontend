import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
  } from "react";
  
  /* ---------------- Initial Proposal Data ---------------- */
  
  const initialProposals = [
    {
      id: 1,
      customer_id: 1,
      department_id: 2,
      description: "Corporate website redesign and optimization",
      budget: 250000,
      status: "PENDING",
      deadline: "2024-02-15",
      createdAt: "2024-01-20",
    },
    {
      id: 2,
      customer_id: 2,
      department_id: 3,
      description: "Hospital management system implementation",
      budget: 450000,
      status: "SENT",
      deadline: "2024-02-20",
      createdAt: "2024-01-22",
    },
    {
      id: 3,
      customer_id: 3,
      department_id: 1,
      description: "Financial analytics dashboard development",
      budget: 600000,
      status: "ACCEPTED",
      deadline: "2024-03-05",
      createdAt: "2024-01-18",
    },
    {
      id: 4,
      customer_id: 4,
      department_id: 4,
      description: "Retail POS system upgrade",
      budget: 180000,
      status: "REJECTED",
      deadline: "2024-02-10",
      createdAt: "2024-01-10",
    },
    {
      id: 5,
      customer_id: 5,
      department_id: 2,
      description: "Manufacturing ERP module integration",
      budget: 900000,
      status: "SENT",
      deadline: "2024-03-15",
      createdAt: "2024-01-25",
    },
    {
      id: 6,
      customer_id: 6,
      department_id: 5,
      description: "Online learning platform development",
      budget: 320000,
      status: "PENDING",
      deadline: "2024-02-28",
      createdAt: "2024-01-26",
    },
    {
      id: 7,
      customer_id: 7,
      department_id: 3,
      description: "Real estate CRM customization",
      budget: 750000,
      status: "ACCEPTED",
      deadline: "2024-03-20",
      createdAt: "2024-01-12",
    },
    {
      id: 8,
      customer_id: 8,
      department_id: 1,
      description: "Hotel booking and reservation system",
      budget: 400000,
      status: "SENT",
      deadline: "2024-02-25",
      createdAt: "2024-01-21",
    },
    {
      id: 9,
      customer_id: 1,
      department_id: 2,
      description: "SEO optimization and digital marketing campaign",
      budget: 120000,
      status: "PENDING",
      deadline: "2024-02-05",
      createdAt: "2024-01-28",
    },
    {
      id: 10,
      customer_id: 3,
      department_id: 4,
      description: "Mobile banking application UI revamp",
      budget: 500000,
      status: "REJECTED",
      deadline: "2024-02-18",
      createdAt: "2024-01-14",
    },
  ];
  
  /* ---------------- Context & Hook ---------------- */
  
  const ProposalContext = createContext();
  
  const useProposals = () => {
    const context = useContext(ProposalContext);
    if (!context) {
      throw new Error("useProposals must be used within a ProposalProvider");
    }
    return context;
  };
  
  /* ---------------- Provider ---------------- */
  
  const ProposalProvider = ({ children }) => {
    const [proposals, setProposals] = useState(() => {
      try {
        const saved = localStorage.getItem("proposals");
        return saved ? JSON.parse(saved) : initialProposals;
      } catch (error) {
        console.error("Error loading proposals from localStorage:", error);
        return initialProposals;
      }
    });
  
    const [loading, setLoading] = useState(false);
  
    /* ---------- Persist to localStorage ---------- */
    useEffect(() => {
      try {
        localStorage.setItem("proposals", JSON.stringify(proposals));
      } catch (error) {
        console.error("Error saving proposals to localStorage:", error);
      }
    }, [proposals]);
  
    /* ---------- Helpers ---------- */
    const generateUniqueId = useCallback(() => {
      return Date.now() + Math.floor(Math.random() * 1000);
    }, []);
  
    /* ---------- CRUD Operations ---------- */
  
    // CREATE
    const addProposal = useCallback((proposalData) => {
      return new Promise((resolve, reject) => {
        setLoading(true);
  
        setTimeout(() => {
          try {
            const newProposal = {
              id: generateUniqueId(),
              ...proposalData,
              budget: proposalData.budget || 0,
              status: proposalData.status || "PENDING",
              createdAt: new Date().toISOString().split("T")[0],
            };
  
            setProposals((prev) => [newProposal, ...prev]);
            resolve(newProposal);
          } catch (error) {
            reject(error);
          } finally {
            setLoading(false);
          }
        }, 500);
      });
    }, [generateUniqueId]);
  
    // UPDATE
    const updateProposal = useCallback((id, proposalData) => {
      return new Promise((resolve, reject) => {
        setLoading(true);
  
        setTimeout(() => {
          try {
            setProposals((prev) =>
              prev.map((proposal) =>
                proposal.id === id
                  ? {
                      ...proposal,
                      ...proposalData,
                      updatedAt: new Date().toISOString().split("T")[0],
                    }
                  : proposal
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
  
    // DELETE
    const deleteProposal = useCallback((id) => {
      return new Promise((resolve, reject) => {
        setLoading(true);
  
        setTimeout(() => {
          try {
            setProposals((prev) => prev.filter((p) => p.id !== id));
            resolve();
          } catch (error) {
            reject(error);
          } finally {
            setLoading(false);
          }
        }, 500);
      });
    }, []);
  
    /* ---------- Query Helpers ---------- */
  
    const getProposalById = useCallback(
      (id) => proposals.find((p) => p.id === id),
      [proposals]
    );
  
    const getProposalsByStatus = useCallback(
      (status) => proposals.filter((p) => p.status === status),
      [proposals]
    );
  
    const getProposalsByCustomer = useCallback(
      (customerId) => proposals.filter((p) => p.customer_id === customerId),
      [proposals]
    );
  
    /* ---------- Stats ---------- */
  
    const getProposalStats = useCallback(() => {
      const total = proposals.length;
      const pending = proposals.filter(p => p.status === "PENDING").length;
      const sent = proposals.filter(p => p.status === "SENT").length;
      const accepted = proposals.filter(p => p.status === "ACCEPTED").length;
      const rejected = proposals.filter(p => p.status === "REJECTED").length;
      const totalValue = proposals.reduce((sum, p) => sum + (p.budget || 0), 0);
  
      return {
        total,
        pending,
        sent,
        accepted,
        rejected,
        totalValue,
      };
    }, [proposals]);
  
    /* ---------- Context Value ---------- */
  
    const value = {
      proposals,
      loading,
      addProposal,
      updateProposal,
      deleteProposal,
      getProposalById,
      getProposalsByStatus,
      getProposalsByCustomer,
      getProposalStats,
    };
  
    return (
      <ProposalContext.Provider value={value}>
        {children}
      </ProposalContext.Provider>
    );
  };
  
  export { ProposalProvider, useProposals };
  export default ProposalProvider;