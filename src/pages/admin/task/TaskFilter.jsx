import React from "react";
import { IoClose } from "react-icons/io5";

export default function TaskFilter({
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
      assigneeId: "All",
      dueDate: "All",
    });
  };

  const statusOptions = ["All", "TODO", "IN_PROGRESS", "DONE", "BLOCKED"];
  const departmentOptions = ["All", "1", "2", "3", "4", "5"];
  const assigneeOptions = ["All", "1", "2", "3", "4", "5"];
  const dueDateOptions = ["All", "Today", "This Week", "This Month", "Overdue"];

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Filter Tasks
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
            Assignee
          </label>
          <select
            value={filterOptions.assigneeId}
            onChange={(e) =>
              handleFilterChange("assigneeId", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {assigneeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <select
            value={filterOptions.dueDate}
            onChange={(e) =>
              handleFilterChange("dueDate", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {dueDateOptions.map((opt) => (
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

