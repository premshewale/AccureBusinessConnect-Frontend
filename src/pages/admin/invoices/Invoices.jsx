import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { MdOutlineRefresh } from "react-icons/md";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";
import InvoicesStats from "./InvoicesStats.jsx";
import InvoicesFilter from "./InvoicesFilter.jsx";
import { useInvoices } from "../../../contexts/InvoiceContext.jsx"; 

export default function Invoices() {
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState("table");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: "All",
    customer: "All",
    dateRange: "All",
    amountRange: "All",
    paymentMethod: "All",
    sortBy: "issueDate",
  });
  
  // Get invoices from context
  const { invoices, loading, deleteInvoice, getInvoiceStats } = useInvoices();
  const invoiceStats = getInvoiceStats();
  
  // Handle refresh
  const handleRefresh = () => {
    window.location.reload();
  };
  
  // Prepare data for export
  const exportData = invoices.map(invoice => ({
    "Invoice No": invoice.invoiceNumber,
    Customer: invoice.customerName,
    "Issue Date": new Date(invoice.issueDate).toLocaleDateString('en-IN'),
    "Due Date": new Date(invoice.dueDate).toLocaleDateString('en-IN'),
    "Total Amount": `₹${invoice.totalAmount.toLocaleString('en-IN')}`,
    "Amount Paid": `₹${invoice.amountPaid.toLocaleString('en-IN')}`,
    "Due Amount": `₹${invoice.dueAmount.toLocaleString('en-IN')}`,
    Status: invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1),
    "Payment Method": invoice.paymentMethod,
    "Payment Date": invoice.paymentDate ? new Date(invoice.paymentDate).toLocaleDateString('en-IN') : 'N/A',
    "Transaction ID": invoice.transactionId || 'N/A',
    "Created By": invoice.createdBy,
    "Created At": new Date(invoice.createdAt).toLocaleDateString('en-IN'),
  }));
  
  // Filter invoices based on active filters
  const filteredInvoices = invoices.filter(invoice => {
    // Search filter
    if (searchQuery && 
        !invoice.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !invoice.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !invoice.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !invoice.transactionId?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter buttons (All, Paid, Pending, Partial, Overdue)
    if (filter !== "All" && invoice.status !== filter.toLowerCase()) {
      return false;
    }
    
    // Additional filter options from filter panel
    if (filterOptions.status !== "All" && invoice.status !== filterOptions.status.toLowerCase()) {
      return false;
    }
    
    if (filterOptions.customer !== "All" && invoice.customerName !== filterOptions.customer) {
      return false;
    }
    
    if (filterOptions.paymentMethod !== "All" && invoice.paymentMethod !== filterOptions.paymentMethod) {
      return false;
    }
    
    // Amount range filter
    if (filterOptions.amountRange !== "All") {
      const amount = invoice.totalAmount;
      switch(filterOptions.amountRange) {
        case "low":
          if (amount > 50000) return false;
          break;
        case "medium":
          if (amount <= 50000 || amount > 200000) return false;
          break;
        case "high":
          if (amount <= 200000) return false;
          break;
        default:
          break;
      }
    }
    
    // Date range filter
    if (filterOptions.dateRange !== "All") {
      const invoiceDate = new Date(invoice.issueDate);
      
      switch(filterOptions.dateRange) {
        case "Today": {
          const today = new Date();
          if (invoiceDate.toDateString() !== today.toDateString()) return false;
          break;
        }
        case "Yesterday": {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (invoiceDate.toDateString() !== yesterday.toDateString()) return false;
          break;
        }
        case "This Week": {
          const today = new Date();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          if (invoiceDate < startOfWeek) return false;
          break;
        }
        case "This Month": {
          const today = new Date();
          if (invoiceDate.getMonth() !== today.getMonth() || 
              invoiceDate.getFullYear() !== today.getFullYear()) return false;
          break;
        }
        case "Last Month": {
          const today = new Date();
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          if (invoiceDate.getMonth() !== lastMonth.getMonth() || 
              invoiceDate.getFullYear() !== lastMonth.getFullYear()) return false;
          break;
        }
        case "This Year": {
          const today = new Date();
          if (invoiceDate.getFullYear() !== today.getFullYear()) return false;
          break;
        }
        case "Last Year": {
          const today = new Date();
          if (invoiceDate.getFullYear() !== today.getFullYear() - 1) return false;
          break;
        }
        case "Custom Range": {
          if (filterOptions.startDate && filterOptions.endDate) {
            const startDate = new Date(filterOptions.startDate);
            const endDate = new Date(filterOptions.endDate);
            endDate.setHours(23, 59, 59, 999);
            if (invoiceDate < startDate || invoiceDate > endDate) return false;
          }
          break;
        }
        default:
          break;
      }
    }
    
    return true;
  });
  
  // Sort filtered invoices
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    switch(filterOptions.sortBy) {
      case "dueDate":
        return new Date(a.dueDate) - new Date(b.dueDate);
      case "totalAmount":
        return b.totalAmount - a.totalAmount;
      case "customerName":
        return a.customerName.localeCompare(b.customerName);
      case "status":
        return a.status.localeCompare(b.status);
      default: // issueDate
        return new Date(b.issueDate) - new Date(a.issueDate);
    }
  });
  
  // Convert filtered invoices to Kanban format
  const kanbanColumns = [
    {
      title: "Draft",
      cards: sortedInvoices.filter(i => i.status === "draft").map(invoice => ({
        id: invoice.id,
        name: invoice.invoiceNumber,
        service: invoice.customerName,
        phone: `₹${invoice.totalAmount.toLocaleString('en-IN')}`,
        email: invoice.customerEmail,
        createdOn: new Date(invoice.issueDate).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Draft",
      })),
    },
    {
      title: "Pending",
      cards: sortedInvoices.filter(i => i.status === "pending").map(invoice => ({
        id: invoice.id,
        name: invoice.invoiceNumber,
        service: invoice.customerName,
        phone: `₹${invoice.totalAmount.toLocaleString('en-IN')}`,
        email: invoice.customerEmail,
        createdOn: new Date(invoice.dueDate).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Pending",
      })),
    },
    {
      title: "Partial",
      cards: sortedInvoices.filter(i => i.status === "partial").map(invoice => ({
        id: invoice.id,
        name: invoice.invoiceNumber,
        service: invoice.customerName,
        phone: `₹${invoice.dueAmount.toLocaleString('en-IN')} due`,
        email: `Paid: ₹${invoice.amountPaid.toLocaleString('en-IN')}`,
        createdOn: new Date(invoice.dueDate).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Partial",
      })),
    },
    {
      title: "Paid",
      cards: sortedInvoices.filter(i => i.status === "paid").map(invoice => ({
        id: invoice.id,
        name: invoice.invoiceNumber,
        service: invoice.customerName,
        phone: `₹${invoice.totalAmount.toLocaleString('en-IN')}`,
        email: invoice.paymentMethod,
        createdOn: new Date(invoice.paymentDate).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Paid",
      })),
    },
    {
      title: "Overdue",
      cards: sortedInvoices.filter(i => i.status === "overdue").map(invoice => ({
        id: invoice.id,
        name: invoice.invoiceNumber,
        service: invoice.customerName,
        phone: `₹${invoice.dueAmount.toLocaleString('en-IN')} overdue`,
        email: invoice.customerEmail,
        createdOn: new Date(invoice.dueDate).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Overdue",
      })),
    },
  ];
  
  // Status options for filter buttons
  const statuses = ["All", "Paid", "Pending", "Partial", "Overdue"];
  
  // Customer options for quick filter
  const customers = ["All", "Acme Corporation", "Tech Solutions Ltd", "Global Retail Inc", "StartUp Innovations", "EduTech Solutions"];

  const handleEdit = (invoice) => {
    navigate(`/admin/edit-invoice/${invoice.id}`);
  };

  const handleDelete = async (invoice) => {
    if (confirm(`Are you sure you want to delete invoice: ${invoice.invoiceNumber}?`)) {
      try {
        await deleteInvoice(invoice.id);
        alert(`Invoice "${invoice.invoiceNumber}" deleted successfully!`);
      } catch (error) {
        alert(`Error deleting invoice: ${error.message}`);
      }
    }
  };

  const handleView = (invoice) => {
    navigate(`/admin/invoices/${invoice.id}`);
  };

  const handleCreateInvoice = () => {
    navigate("/admin/create-invoice");
  };

  const handleSendInvoice = (invoice) => {
    if (confirm(`Send invoice ${invoice.invoiceNumber} to ${invoice.customerEmail}?`)) {
      alert(`Invoice ${invoice.invoiceNumber} sent to ${invoice.customerEmail}`);
    }
  };

  const handleRecordPayment = (invoice) => {
    navigate(`/admin/record-payment/${invoice.id}`);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
          <p className="text-gray-600">Manage and track all customer invoices</p>
        </div>
        <button
          onClick={handleCreateInvoice}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> Create Invoice
        </button>
      </div>

      {/* Statistics Cards */}
      <InvoicesStats stats={invoiceStats} />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center gap-4">
          {/* Export Button */}
          <CommonExportButton 
            data={exportData}
            fileName="invoices"
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
              placeholder="Search by invoice number, customer, email..."
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
        <InvoicesFilter
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
      
      {/* Customer Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <p className="text-sm font-medium text-gray-700 mr-2 self-center">Customer:</p>
        {customers.slice(0, 5).map((customer) => (
          <button
            key={customer}
            onClick={() => setFilterOptions(prev => ({
              ...prev,
              customer: customer === "All" ? "All" : customer
            }))}
            className={`rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
              filterOptions.customer === customer
                ? "bg-cyan text-white border-cyan"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {customer.length > 15 ? `${customer.substring(0, 12)}...` : customer}
          </button>
        ))}
      </div>
      
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {sortedInvoices.length} of {invoices.length} invoices
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
        ) : sortedInvoices.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <div className="text-4xl mb-4">🧾</div>
            <p className="text-lg mb-2">No invoices found</p>
            <p className="text-sm mb-4">Try adjusting your filters or search query</p>
            <button
              onClick={handleCreateInvoice}
              className="px-4 py-2 bg-cyan text-white rounded-lg hover:bg-cyan-700"
            >
              Create Your First Invoice
            </button>
          </div>
        ) : (
          <>
            {/* Kanban View */}
            {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}
            
            {/* Table View */}
            {activeTab === "table" && (
              <CommonTable
                type="invoices"
                data={sortedInvoices}
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