import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";
import CustomerStats from "./CustomerStats.jsx";
import CustomerFilter from "./CustomerFilter.jsx";
import { useCustomers } from "../../../contexts/CustomerContext";

export default function Customers() {
  const [activeTab, setActiveTab] = useState("table");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: "All",
    source: "All",
    dateRange: "All",
    industry: "All",
  });
  
  const navigate = useNavigate();
  
  // Get customers and functions from context
  const { customers, loading, deleteCustomer, getCustomerStats } = useCustomers();
  const customerStats = getCustomerStats();
  
  // Refresh customers
  const handleRefresh = () => {
    window.location.reload();
  };
  
  // Prepare data for export
  const exportData = customers.map(customer => ({
    ID: customer.id,
    Name: customer.name,
    Email: customer.email,
    Phone: customer.phone,
    Company: customer.company,
    Industry: customer.industry,
    Status: customer.status,
    Source: customer.source,
    "Total Value": customer.totalValue,
    "Last Contact": customer.lastContact,
    Created: customer.createdAt,
  }));
  
  // Filter customers based on active filters
  const filteredCustomers = customers.filter(customer => {
    // Search filter
    if (searchQuery && 
        !customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !customer.company?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter buttons (All, Active, Inactive, etc.)
    if (filter !== "All" && customer.status !== filter.toLowerCase()) {
      return false;
    }
    
    // Additional filter options from filter panel
    if (filterOptions.status !== "All" && customer.status !== filterOptions.status.toLowerCase()) {
      return false;
    }
    
    if (filterOptions.source !== "All" && customer.source !== filterOptions.source) {
      return false;
    }
    
    if (filterOptions.industry !== "All" && customer.industry !== filterOptions.industry) {
      return false;
    }
    
    return true;
  });
  
  // Convert filtered customers to Kanban format
  const kanbanColumns = [
    {
      title: "New/Prospect",
      cards: filteredCustomers.filter(c => c.status === "new" || c.status === "prospect").map(customer => ({
        id: customer.id,
        name: customer.name,
        service: customer.company,
        phone: customer.phone,
        email: customer.email,
        createdOn: new Date(customer.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: customer.status === "new" ? "New" : "Prospect",
      })),
    },
    {
      title: "Active",
      cards: filteredCustomers.filter(c => c.status === "active").map(customer => ({
        id: customer.id,
        name: customer.name,
        service: customer.company,
        phone: customer.phone,
        email: customer.email,
        createdOn: new Date(customer.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Active",
      })),
    },
    {
      title: "Inactive",
      cards: filteredCustomers.filter(c => c.status === "inactive").map(customer => ({
        id: customer.id,
        name: customer.name,
        service: customer.company,
        phone: customer.phone,
        email: customer.email,
        createdOn: new Date(customer.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status: "Inactive",
      })),
    },
  ];
  
  // Status options for filter buttons
  const statuses = ["All", "Active", "Inactive", "New", "Prospect", "Lost"];

  const handleEdit = (customer) => {
    navigate(`/admin/edit-customer/${customer.id}`);
  };

  const handleDelete = async (customer) => {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      try {
        await deleteCustomer(customer.id);
        alert(`Customer ${customer.name} deleted successfully!`);
      } catch (error) {
        alert(`Error deleting customer: ${error.message}`);
      }
    }
  };

  const handleView = (customer) => {
    navigate(`/admin/customers/${customer.id}`);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          <p className="text-gray-600">Manage all your customers in one place</p>
        </div>
        <button
          onClick={() => navigate("/admin/create-customer")}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> Add Customer
        </button>
      </div>

      {/* Statistics Cards */}
      <CustomerStats stats={customerStats} />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center gap-4">
          {/* Use CommonExportButton instead of custom export */}
          <CommonExportButton 
            data={exportData}
            fileName="customers"
          />
          
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
              placeholder="Search customers by name, email, company..."
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
        <CustomerFilter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={() => setShowFilter(false)}
        />
      )}
      
      {/* Status Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
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
      
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {filteredCustomers.length} of {customers.length} customers
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
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <div className="text-4xl mb-4">📁</div>
            <p className="text-lg mb-2">No customers found</p>
            <p className="text-sm mb-4">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {/* Kanban View */}
            {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}
            
            {/* Table View */}
            {activeTab === "table" && (
              <CommonTable
                type="customers"
                data={filteredCustomers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                showExport={false} // Disable export in table since we have CommonExportButton
                showActions={true}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}