import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { MdOutlineRefresh } from "react-icons/md";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";
import ExpensesStats from "./ExpensesStats.jsx";
import ExpensesFilter from "./ExpensesFilter.jsx";
import { useExpenses } from "../../../contexts/ExpenseContext.jsx"; 

export default function Expenses() {
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState("table");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: "All",
    category: "All",
    dateRange: "All",
    amountRange: "All",
    vendor: "All",
  });
  
  // Get expenses from context
  const { expenses, loading, deleteExpense, getExpenseStats } = useExpenses();
  const expenseStats = getExpenseStats();
  
  // Handle refresh
  const handleRefresh = () => {
    window.location.reload();
  };
  
  // Prepare data for export
  const exportData = expenses.map(expense => ({
    ID: expense.id,
    Title: expense.title,
    Description: expense.description,
    Amount: `₹${expense.amount.toLocaleString('en-IN')}`,
    Category: expense.category,
    Date: new Date(expense.date).toLocaleDateString('en-IN'),
    Vendor: expense.vendor,
    "Payment Method": expense.paymentMethod,
    Status: expense.status.charAt(0).toUpperCase() + expense.status.slice(1),
    "Receipt Number": expense.receiptNumber,
    "Created By": expense.createdBy,
    "Created At": new Date(expense.createdAt).toLocaleDateString('en-IN'),
  }));
  
  // Filter expenses based on active filters
  const filteredExpenses = expenses.filter(expense => {
    // Search filter
    if (searchQuery && 
        !expense.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !expense.description?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !expense.vendor?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !expense.receiptNumber?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter buttons (All, Approved, Pending, Rejected)
    if (filter !== "All" && expense.status !== filter.toLowerCase()) {
      return false;
    }
    
    // Additional filter options from filter panel
    if (filterOptions.status !== "All" && expense.status !== filterOptions.status.toLowerCase()) {
      return false;
    }
    
    if (filterOptions.category !== "All" && expense.category !== filterOptions.category) {
      return false;
    }
    
    if (filterOptions.vendor !== "All" && expense.vendor !== filterOptions.vendor) {
      return false;
    }
    
    // Amount range filter
    if (filterOptions.amountRange !== "All") {
      const amount = expense.amount;
      switch(filterOptions.amountRange) {
        case "low":
          if (amount > 10000) return false;
          break;
        case "medium":
          if (amount <= 10000 || amount > 50000) return false;
          break;
        case "high":
          if (amount <= 50000) return false;
          break;
        default:
          break;
      }
    }
    
    // Date range filter (simplified for demo)
    if (filterOptions.dateRange !== "All") {
      const expenseDate = new Date(expense.date);
      
      switch(filterOptions.dateRange) {
        case "Today": {
          const today = new Date();
          if (expenseDate.toDateString() !== today.toDateString()) return false;
          break;
        }
        case "Yesterday": {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (expenseDate.toDateString() !== yesterday.toDateString()) return false;
          break;
        }
        case "This Week": {
          const today = new Date();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          if (expenseDate < startOfWeek) return false;
          break;
        }
        case "This Month": {
          const today = new Date();
          if (expenseDate.getMonth() !== today.getMonth() || 
              expenseDate.getFullYear() !== today.getFullYear()) return false;
          break;
        }
        case "Last Month": {
          const today = new Date();
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          if (expenseDate.getMonth() !== lastMonth.getMonth() || 
              expenseDate.getFullYear() !== lastMonth.getFullYear()) return false;
          break;
        }
        case "This Year": {
          const today = new Date();
          if (expenseDate.getFullYear() !== today.getFullYear()) return false;
          break;
        }
        case "Last Year": {
          const today = new Date();
          if (expenseDate.getFullYear() !== today.getFullYear() - 1) return false;
          break;
        }
        default:
          break;
      }
    }
    
    return true;
  });
  
  // Convert filtered expenses to Kanban format
  const kanbanColumns = [
    {
      title: "Pending",
      cards: filteredExpenses.filter(e => e.status === "pending").map(expense => ({
        id: expense.id,
        name: expense.title,
        service: expense.category,
        phone: `₹${expense.amount.toLocaleString('en-IN')}`,
        email: expense.vendor,
        createdOn: new Date(expense.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Pending",
      })),
    },
    {
      title: "Approved",
      cards: filteredExpenses.filter(e => e.status === "approved").map(expense => ({
        id: expense.id,
        name: expense.title,
        service: expense.category,
        phone: `₹${expense.amount.toLocaleString('en-IN')}`,
        email: expense.vendor,
        createdOn: new Date(expense.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Approved",
      })),
    },
    {
      title: "Rejected",
      cards: filteredExpenses.filter(e => e.status === "rejected").map(expense => ({
        id: expense.id,
        name: expense.title,
        service: expense.category,
        phone: `₹${expense.amount.toLocaleString('en-IN')}`,
        email: expense.vendor,
        createdOn: new Date(expense.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Rejected",
      })),
    },
  ];
  
  // Status options for filter buttons
  const statuses = ["All", "Pending", "Approved", "Rejected"];
  
  // Category options for quick filter
  const categories = ["All", "Office", "Travel", "Marketing", "Software", "Training", "Utilities", "Entertainment", "Maintenance", "Equipment"];

  const handleEdit = (expense) => {
    navigate(`/admin/edit-expense/${expense.id}`);
  };

  const handleDelete = async (expense) => {
    if (confirm(`Are you sure you want to delete expense: ${expense.title}?`)) {
      try {
        await deleteExpense(expense.id);
        alert(`Expense "${expense.title}" deleted successfully!`);
      } catch (error) {
        alert(`Error deleting expense: ${error.message}`);
      }
    }
  };

  const handleView = (expense) => {
    navigate(`/admin/expenses/${expense.id}`);
  };

  const handleCreateExpense = () => {
    navigate("/admin/create-expense");
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <p className="text-gray-600">Track and manage all expenses</p>
        </div>
        <button
          onClick={handleCreateExpense}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> Add Expense
        </button>
      </div>

      {/* Statistics Cards */}
      <ExpensesStats stats={expenseStats} />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center gap-4">
          {/* Export Button */}
          <CommonExportButton 
            data={exportData}
            fileName="expenses"
          />
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Refresh"
          >
            <MdOutlineRefresh />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses by title, description, vendor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 h-10 rounded-lg border pl-10 pr-3 text-sm outline-none focus:border-cyan"
            />
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              showFilter ? "bg-cyan text-white border-cyan" : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <IoFilterSharp /> Filter
          </button>
        </div>
      </div>
      
      {/* Filter Panel */}
      {showFilter && (
        <ExpensesFilter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={() => setShowFilter(false)}
        />
      )}
      
      {/* Status Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <p className="text-sm font-medium text-gray-700 mr-2 self-center">Status:</p>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
              filter === status
                ? "bg-cyan text-white border-cyan"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      
      {/* Category Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <p className="text-sm font-medium text-gray-700 mr-2 self-center">Category:</p>
        {categories.slice(0, 6).map((category) => ( // Show only first 6 for space
          <button
            key={category}
            onClick={() => setFilterOptions(prev => ({
              ...prev,
              category: category === "All" ? "All" : category
            }))}
            className={`rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
              filterOptions.category === category
                ? "bg-cyan text-white border-cyan"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {category}
          </button>
        ))}
        {categories.length > 6 && (
          <span className="text-sm text-gray-500 self-center">+{categories.length - 6} more</span>
        )}
      </div>
      
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {filteredExpenses.length} of {expenses.length} expenses
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              activeTab === "kanban"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxDashboard /> Kanban View
          </button>
          
          <button
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              activeTab === "table"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxTable /> Table View
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <div className="text-4xl mb-4">💰</div>
            <p className="text-lg mb-2">No expenses found</p>
            <p className="text-sm mb-4">Try adjusting your filters or search query</p>
            <button
              onClick={handleCreateExpense}
              className="px-4 py-2 bg-cyan text-white rounded-lg hover:bg-cyan-700"
            >
              Add Your First Expense
            </button>
          </div>
        ) : (
          <>
            {/* Kanban View */}
            {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}
            
            {/* Table View */}
            {activeTab === "table" && (
              <CommonTable
                type="expenses"
                data={filteredExpenses}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                showExport={false}
                showActions={true}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}