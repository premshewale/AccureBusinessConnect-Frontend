import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { FiDownload, FiPlus, FiDollarSign } from "react-icons/fi";
import { MdOutlineRefresh } from "react-icons/md";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";
import PaymentStats from "./PaymentStats.jsx";
import PaymentFilter from "./PaymentFilter.jsx";
// import { usePayments } from "../../../contexts/PaymentContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminGetAllPaymentsApi } from "../../../services/payment/adminGetAllPaymentsApi.js";



export default function Payment() {
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState("table");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: "All",
    paymentMethod: "All",
    dateRange: "All",
    amountRange: "All",
    customer: "All",
  });
  
  // Get payments from context
  // const { payments, loading, deletePayment, getPaymentStats, markPaymentAsPaid } = usePayments();
  // const paymentStats = getPaymentStats();
  const dispatch = useDispatch();

// const { payments, loading } = useSelector(
//   (state) => state.adminGetAllPayments
// );
const { payments = [], loading } = useSelector(
  (state) => state.adminGetAllPayments
);

useEffect(() => {
  dispatch(adminGetAllPaymentsApi());
}, [dispatch]);

// ================= PAYMENT STATS =================
const paymentStats = {
  totalPaid: payments
    .filter(p => p.status === "paid")
    .reduce((sum, p) => sum + (p.amountPaid || 0), 0),

  totalDue: payments
    .filter(p => p.status !== "paid")
    .reduce((sum, p) => sum + (p.dueAmount || 0), 0),

  collectionRate: payments.length
    ? Math.round(
        (payments.filter(p => p.status === "paid").length / payments.length) * 100
      )
    : 0,

  thisMonthAmount: payments
    .filter(p => {
      const d = new Date(p.paymentDate);
      const now = new Date();
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, p) => sum + (p.amountPaid || 0), 0),
};

  
  // Handle refresh
  const handleRefresh = () => {
    window.location.reload();
  };
  
  // Prepare data for export
const exportData = payments.map(payment => ({
  ID: payment.id,
  "Invoice No": payment.invoiceNumber || "N/A",
  Customer: payment.customerName || "N/A",
  Amount: `₹${(payment.amount || 0).toLocaleString('en-IN')}`,
  "Amount Paid": `₹${(payment.amountPaid || 0).toLocaleString('en-IN')}`,
  "Due Amount": `₹${(payment.dueAmount || 0).toLocaleString('en-IN')}`,
  "Payment Date": payment.paymentDate
    ? new Date(payment.paymentDate).toLocaleDateString('en-IN')
    : "N/A",
  "Payment Method": payment.paymentMethod || "N/A",
  Status: payment.status
    ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1)
    : "N/A",
  "Transaction ID": payment.transactionId || "N/A",
  "Payment Type": payment.paymentType || "N/A",
  Notes: payment.notes || "",
  "Created By": payment.createdBy || "N/A",
  "Created At": payment.createdAt
    ? new Date(payment.createdAt).toLocaleDateString('en-IN')
    : "N/A",
}));

  
  // Filter payments based on active filters
  const filteredPayments = payments.filter(payment => {
    // Search filter
    if (searchQuery && 
        !payment.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !payment.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !payment.transactionId?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter buttons
    if (filter !== "All" && payment.status !== filter.toLowerCase()) {
      return false;
    }
    
    // Additional filter options from filter panel
    if (filterOptions.status !== "All" && payment.status !== filterOptions.status.toLowerCase()) {
      return false;
    }
    
    if (filterOptions.paymentMethod !== "All" && payment.paymentMethod !== filterOptions.paymentMethod) {
      return false;
    }
    
    if (filterOptions.customer !== "All" && payment.customerName !== filterOptions.customer) {
      return false;
    }
    
    // Amount range filter
    if (filterOptions.amountRange !== "All") {
      const amount = payment.amount;
      switch(filterOptions.amountRange) {
        case "low": {
          if (amount > 50000) return false;
          break;
        }
        case "medium": {
          if (amount <= 50000 || amount > 200000) return false;
          break;
        }
        case "high": {
          if (amount <= 200000) return false;
          break;
        }
        default:
          break;
      }
    }
    
    // Date range filter
    if (filterOptions.dateRange !== "All") {
      const paymentDate = new Date(payment.paymentDate);
      
      switch(filterOptions.dateRange) {
        case "Today": {
          const today = new Date();
          if (paymentDate.toDateString() !== today.toDateString()) return false;
          break;
        }
        case "This Week": {
          const today = new Date();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          if (paymentDate < startOfWeek) return false;
          break;
        }
        case "This Month": {
          const today = new Date();
          if (paymentDate.getMonth() !== today.getMonth() || 
              paymentDate.getFullYear() !== today.getFullYear()) return false;
          break;
        }
        case "Last Month": {
          const today = new Date();
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          if (paymentDate.getMonth() !== lastMonth.getMonth() || 
              paymentDate.getFullYear() !== lastMonth.getFullYear()) return false;
          break;
        }
        default:
          break;
      }
    }
    
    return true;
  });
  
  // Convert filtered payments to Kanban format
const kanbanColumns = [
  {
    title: "Paid",
    cards: filteredPayments
      .filter(p => p.status?.toLowerCase() === "paid")
      .map(payment => ({
        id: payment.id,
        name: `INV: ${payment.invoiceNumber || "N/A"}`,
        service: payment.customerName || "N/A",
        phone: `₹${(payment.amount || 0).toLocaleString('en-IN')}`,
        email: payment.paymentMethod || "N/A",
        createdOn: payment.paymentDate
          ? new Date(payment.paymentDate).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })
          : "N/A",
        status: "Paid",
      })),
  },
  {
    title: "Pending",
    cards: filteredPayments
      .filter(p => p.status?.toLowerCase() === "pending")
      .map(payment => ({
        id: payment.id,
        name: `INV: ${payment.invoiceNumber || "N/A"}`,
        service: payment.customerName || "N/A",
        phone: `₹${(payment.dueAmount || 0).toLocaleString('en-IN')}`,
        email: payment.paymentMethod || "N/A",
        createdOn: payment.paymentDate
          ? new Date(payment.paymentDate).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })
          : "N/A",
        status: "Pending",
      })),
  },
  {
    title: "Partial",
    cards: filteredPayments
      .filter(p => p.status?.toLowerCase() === "partial")
      .map(payment => ({
        id: payment.id,
        name: `INV: ${payment.invoiceNumber || "N/A"}`,
        service: payment.customerName || "N/A",
        phone: `₹${(payment.dueAmount || 0).toLocaleString('en-IN')} due`,
        email: payment.paymentMethod || "N/A",
        createdOn: payment.paymentDate
          ? new Date(payment.paymentDate).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })
          : "N/A",
        status: `Paid: ₹${(payment.amountPaid || 0).toLocaleString('en-IN')}`,
      })),
  },
  {
    title: "Overdue",
    cards: filteredPayments
      .filter(p => p.status?.toLowerCase() === "overdue")
      .map(payment => ({
        id: payment.id,
        name: `INV: ${payment.invoiceNumber || "N/A"}`,
        service: payment.customerName || "N/A",
        phone: `₹${(payment.dueAmount || 0).toLocaleString('en-IN')}`,
        email: payment.paymentMethod || "N/A",
        createdOn: payment.paymentDate
          ? new Date(payment.paymentDate).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })
          : "N/A",
        status: "Overdue",
      })),
  },
];

  
  // Status options for filter buttons
  const statuses = ["All", "Paid", "Pending", "Partial", "Overdue"];
  
  // Payment method options
  const paymentMethods = ["All", "Bank Transfer", "Credit Card", "UPI", "Cash", "Cheque", "Other"];

  const handleEdit = (payment) => {
    navigate(`/admin/edit-payment/${payment.id}`);
  };

const handleDelete = () => {
  alert("Delete API not wired yet");
};

const handleMarkAsPaid = () => {
  alert("Mark as paid API not wired yet");
};


const handleView = (payment) => {
  navigate(`/admin/payments/${payment.id}`);
};

  // const handleMarkAsPaid = async (payment) => {
  //   if (confirm(`Mark payment ${payment.invoiceNumber} as fully paid?`)) {
  //     try {
  //       await markPaymentAsPaid(payment.id);
  //       alert(`Payment ${payment.invoiceNumber} marked as paid!`);
  //     } catch (error) {
  //       alert(`Error updating payment: ${error.message}`);
  //     }
  //   }
  // };

  const handleCreatePayment = () => {
    navigate("/admin/create-payment");
    
  };

  

  // Quick stats for header
const quickStats = [
  {
    title: "Total Collected",
    value: `₹${(paymentStats.totalPaid || 0).toLocaleString('en-IN')}`,
    icon: <FiDollarSign className="text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Pending",
    value: `₹${(paymentStats.totalDue || 0).toLocaleString('en-IN')}`,
    icon: <FiDollarSign className="text-white" />,
    color: "bg-yellow-500",
  },
  {
    title: "Collection Rate",
    value: `${paymentStats.collectionRate || 0}%`,
    icon: <FiDollarSign className="text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "This Month",
    value: `₹${(paymentStats.thisMonthAmount || 0).toLocaleString('en-IN')}`,
    icon: <FiDollarSign className="text-white" />,
    color: "bg-purple-500",
  },
];


  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
          <p className="text-gray-600">Track and manage all customer payments</p>
        </div>
        <button
          onClick={handleCreatePayment}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <FiPlus /> Record Payment
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Statistics */}
      <PaymentStats stats={paymentStats} />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center gap-4">
          {/* Export Button */}
          <CommonExportButton 
            data={exportData}
            fileName="payments"
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
              placeholder="Search by invoice, customer, transaction ID..."
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
        <PaymentFilter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={() => setShowFilter(false)}
          customers={[...new Set(payments.map(p => p.customerName))]}
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
      
      {/* Payment Method Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <p className="text-sm font-medium text-gray-700 mr-2 self-center">Method:</p>
        {paymentMethods.slice(0, 6).map((method) => (
          <button
            key={method}
            onClick={() => setFilterOptions(prev => ({
              ...prev,
              paymentMethod: method === "All" ? "All" : method
            }))}
            className={`rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
              filterOptions.paymentMethod === method
                ? "bg-cyan text-white border-cyan"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {method}
          </button>
        ))}
        {paymentMethods.length > 6 && (
          <span className="text-sm text-gray-500 self-center">+{paymentMethods.length - 6} more</span>
        )}
      </div>
      
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {filteredPayments.length} of {payments.length} payments
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
        ) : filteredPayments.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <div className="text-4xl mb-4">💰</div>
            <p className="text-lg mb-2">No payments found</p>
            <p className="text-sm mb-4">Try adjusting your filters or search query</p>
            <button
              onClick={handleCreatePayment}
              className="px-4 py-2 bg-cyan text-white rounded-lg hover:bg-cyan-700"
            >
              Record First Payment
            </button>
          </div>
        ) : (
          <>
            {/* Kanban View */}
            {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}
            
            {/* Table View */}
            {activeTab === "table" && (
              <CommonTable
                type="payments"
                data={filteredPayments}
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