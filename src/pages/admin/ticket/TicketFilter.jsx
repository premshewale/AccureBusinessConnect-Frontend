import React from "react";
import { IoClose } from "react-icons/io5";

export default function TicketFilter({ filterOptions, setFilterOptions, onClose }) {
  const handleFilterChange = (key, value) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setFilterOptions({
      status: "All",
      priority: "All",
      type: "All",
      assignee: "All",
    });
  };

  const statusOptions = ["All", "open", "in_progress", "resolved", "closed"];
  const priorityOptions = ["All", "high", "medium", "low"];
  const typeOptions = ["All", "technical", "billing", "feature", "bug", "performance", "reporting"];
  const assigneeOptions = ["All", "John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "David Brown", "Emily Davis", "Robert Wilson", "Lisa Anderson"];

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filter Tickets</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <IoClose size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                 option === "in_progress" ? "In Progress" : 
                 option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={filterOptions.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {priorityOptions.map(option => (
              <option key={option} value={option}>
                {option === "All" ? "All" : 
                 option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={filterOptions.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {typeOptions.map(option => (
              <option key={option} value={option}>
                {option === "All" ? "All" : 
                 option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Assignee Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assignee
          </label>
          <select
            value={filterOptions.assignee}
            onChange={(e) => handleFilterChange("assignee", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
          >
            {assigneeOptions.map(option => (
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