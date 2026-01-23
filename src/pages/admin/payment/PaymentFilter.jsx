import React from "react";
import { IoClose } from "react-icons/io5";

export default function PaymentFilter({ filterOptions, setFilterOptions, onClose, customers = [] }) {
  const handleFilterChange = (key, value) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setFilterOptions({
      status: "All",
      paymentMethod: "All",
      dateRange: "All",
      amountRange: "All",
      customer: "All",
    });
  };

  const statusOptions = ["All", "paid", "pending", "partial", "overdue"];
  const paymentMethodOptions = ["All", "Bank Transfer", "Credit Card", "UPI", "Cash", "Cheque", "Other"];
  const dateRangeOptions = ["All", "Today", "Yesterday", "This Week", "This Month", "Last Month", "This Year", "Last Year"];
  const amountRangeOptions = ["All", "Low (< ₹50,000)", "Medium (₹50,000 - ₹2,00,000)", "High (> ₹2,00,000)"];
  
  const customerOptions = ["All", ...customers].slice(0, 10); // Show top 10 customers

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filter Payments</h3>
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
              <option key={option} value={option}>
                {option === "All" ? "All" : 
                 option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Payment Method Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            value={filterOptions.paymentMethod}
            onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {paymentMethodOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Customer Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer
          </label>
          <select
            value={filterOptions.customer}
            onChange={(e) => handleFilterChange("customer", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {customerOptions.map(option => (
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
        
        {/* Payment Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Type
          </label>
          <select
            value={filterOptions.paymentType || "All"}
            onChange={(e) => handleFilterChange("paymentType", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {["All", "full", "installment", "advance", "final"].map(option => (
              <option key={option} value={option}>
                {option === "All" ? "All" : 
                 option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
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