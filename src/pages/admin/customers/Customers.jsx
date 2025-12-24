import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { MdOutlineRefresh } from "react-icons/md";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import CustomerStats from "./CustomerStats.jsx";
import CustomerFilter from "./CustomerFilter.jsx";

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
  
  // Static customer data
  const customers = [
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

  // Refresh customers
  const handleRefresh = () => {
    alert("Customers refreshed!");
  };
 
  {/* // Export customers
  const handleExport = () => {
    alert("Export functionality would download customer data as CSV");
  };*/}
 
  
  // Filter customers based on active filters
  const filteredCustomers = customers.filter(customer => {
    // Search filter
    if (searchQuery && !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !customer.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !customer.company.toLowerCase().includes(searchQuery.toLowerCase())) {
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
      title: "New",
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
    alert(`Edit customer: ${customer.name}\nID: ${customer.id}`);
  };

  const handleDelete = (customer) => {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      alert(`Customer ${customer.name} deleted!`);
    }
  };

  const handleView = (customer) => {
    alert(`View customer details for: ${customer.name}`);
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
      <CustomerStats customers={customers} />

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center gap-4">
          {/*<button
            onClick={handleExport}
            className="px-4 py-2 border border-cyan text-cyan rounded-lg hover:bg-cyan-50 transition-colors flex items-center gap-2"
          >
            <FiDownload /> Export
          </button>*/}
          
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
        {filteredCustomers.length === 0 ? (
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
                showExport={true}
                showActions={true}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}