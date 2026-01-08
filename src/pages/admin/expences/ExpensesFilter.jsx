import React from "react";
import { IoClose } from "react-icons/io5";

export default function ExpensesFilter({ filterOptions, setFilterOptions, onClose }) {
  const handleFilterChange = (key, value) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setFilterOptions({
      status: "All",
      category: "All",
      dateRange: "All",
      amountRange: "All",
      vendor: "All",
    });
  };


  const statusOptions = ["All", "Approved", "Pending", "Rejected"];
  const categoryOptions = ["All", "Office", "Travel", "Marketing", "Software", "Training", "Utilities", "Entertainment", "Maintenance", "Other"];
  const dateRangeOptions = ["All", "Today", "Yesterday", "This Week", "This Month", "Last Month", "This Year", "Last Year", "Custom Range"];
  const amountRangeOptions = ["All", "Low (< ₹10,000)", "Medium (₹10,000 - ₹50,000)", "High (> ₹50,000)"];
  
  // Extract unique vendors from data (in real app, this would come from API)
  const vendorOptions = ["All", "Stationery Mart", "Food Paradise", "Adobe Inc", "Airline Corp", "Print Solutions", "Internet Provider", "Skill Academy", "CleanCo Services"];

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filter Expenses</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <IoClose size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filterOptions.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {statusOptions.map(option => (
              <option key={option} value={option === "All" ? "All" : option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filterOptions.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Amount Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount Range
          </label>
          <select
            value={filterOptions.amountRange}
            onChange={(e) => {
              const value = e.target.value;
              let rangeValue = "All";
              if (value.includes("Low")) rangeValue = "low";
              else if (value.includes("Medium")) rangeValue = "medium";
              else if (value.includes("High")) rangeValue = "high";
              handleFilterChange("amountRange", rangeValue);
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {amountRangeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            value={filterOptions.dateRange}
            onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {dateRangeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Vendor Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vendor
          </label>
          <select
            value={filterOptions.vendor}
            onChange={(e) => handleFilterChange("vendor", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {vendorOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Payment Method Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            value={filterOptions.paymentMethod || "All"}
            onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {["All", "Cash", "Credit Card", "Debit Card", "Bank Transfer", "Cheque", "UPI", "Other"].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset Filters
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-cyan text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}