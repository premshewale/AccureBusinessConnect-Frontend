import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
  } from "react";
  
  const initialTasks = [
    {
      id: 1,
      customer_id: 1,
      title: "Call customer for requirements",
      status: "TODO",
      assignee_id: 3,
      department_id: 2,
      due_date: "2024-02-10",
      createdAt: "2024-01-28",
    },
    {
      id: 2,
      customer_id: 2,
      title: "Prepare proposal draft",
      status: "IN_PROGRESS",
      assignee_id: 4,
      department_id: 3,
      due_date: "2024-02-12",
      createdAt: "2024-01-27",
    },
    {
      id: 3,
      customer_id: 3,
      title: "Finalize contract",
      status: "DONE",
      assignee_id: 5,
      department_id: 1,
      due_date: "2024-02-05",
      createdAt: "2024-01-20",
    },
    {
      id: 4,
      customer_id: 4,
      title: "Resolve payment issue",
      status: "BLOCKED",
      assignee_id: 6,
      department_id: 4,
      due_date: "2024-02-15",
      createdAt: "2024-01-22",
    },
    {
      id: 5,
      customer_id: 5,
      title: "Follow up with lead",
      status: "TODO",
      assignee_id: 2,
      department_id: 2,
      due_date: "2024-02-18",
      createdAt: "2024-01-25",
    },
    {
      id: 6,
      customer_id: 6,
      title: "Assign onboarding documents",
      status: "IN_PROGRESS",
      assignee_id: 3,
      department_id: 1,
      due_date: "2024-02-20",
      createdAt: "2024-01-26",
    },
    {
      id: 7,
      customer_id: 7,
      title: "Verify KYC details",
      status: "DONE",
      assignee_id: 4,
      department_id: 3,
      due_date: "2024-02-08",
      createdAt: "2024-01-21",
    },
    {
      id: 8,
      customer_id: 8,
      title: "Update CRM notes",
      status: "TODO",
      assignee_id: 5,
      department_id: 2,
      due_date: "2024-02-22",
      createdAt: "2024-01-29",
    },
    {
      id: 9,
      customer_id: 9,
      title: "Prepare task report",
      status: "BLOCKED",
      assignee_id: 6,
      department_id: 4,
      due_date: "2024-02-25",
      createdAt: "2024-01-24",
    },
    {
      id: 10,
      customer_id: 10,
      title: "Close completed tasks",
      status: "DONE",
      assignee_id: 2,
      department_id: 1,
      due_date: "2024-02-03",
      createdAt: "2024-01-18",
    },
  ];
  
  const TaskContext = createContext();
  
  export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
      throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
  };
  
  const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : initialTasks;
    });
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
  
    const generateId = () => Date.now();
  
    const addTask = useCallback((data) => {
      const newTask = {
        id: generateId(),
        ...data,
        status: data.status || "TODO",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTasks((prev) => [newTask, ...prev]);
    }, []);
  
    const updateTask = useCallback((id, data) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
    }, []);
  
    const deleteTask = useCallback((id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }, []);
  
    const getTaskStats = useCallback(() => {
      return {
        total: tasks.length,
        todo: tasks.filter((t) => t.status === "TODO").length,
        inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
        done: tasks.filter((t) => t.status === "DONE").length,
        blocked: tasks.filter((t) => t.status === "BLOCKED").length,
      };
    }, [tasks]);
  
    return (
      <TaskContext.Provider
        value={{
          tasks,
          loading,
          addTask,
          updateTask,
          deleteTask,
          getTaskStats,
        }}
      >
        {children}
      </TaskContext.Provider>
    );
  };
  
  export default TaskProvider;
  