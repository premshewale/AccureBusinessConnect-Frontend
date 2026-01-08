import React from "react";
import { IoClose } from "react-icons/io5";

export default function ProposalFilter({
  filterOptions,
  setFilterOptions,
  onClose,
}) {
  if (!filterOptions) return null;

  const handleFilterChange = (key, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilterOptions({
      status: "All",
      departmentId: "All",
      budgetRange: "All",
      deadline: "All",
    });
  };

  const statusOptions = ["All", "PENDING", "SENT", "ACCEPTED", "REJECTED"];
  const departmentOptions = ["All", "1", "2", "3", "4", "5"];
  const budgetOptions = ["All", "Below 50k", "50k - 1L", "1L - 5L", "Above 5L"];
  const deadlineOptions = ["All", "Today", "This Week", "This Month", "Overdue"];

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Filter Proposals
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <IoClose size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filterOptions.status}
            onChange={(e) =>
              handleFilterChange("status", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <select
            value={filterOptions.departmentId}
            onChange={(e) =>
              handleFilterChange("departmentId", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {departmentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget
          </label>
          <select
            value={filterOptions.budgetRange}
            onChange={(e) =>
              handleFilterChange("budgetRange", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deadline
          </label>
          <select
            value={filterOptions.deadline}
            onChange={(e) =>
              handleFilterChange("deadline", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {deadlineOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
        <button
          onClick={handleReset}
          className="px-4 py-2 border rounded-lg"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-cyan text-white rounded-lg"
        >
          Apply
        </button>
      </div>
    </div>
  );
}