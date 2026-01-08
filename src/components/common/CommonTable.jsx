import React, { useState } from "react";
import {
  FiDownload,
  FiFilter,
  FiEye,
  FiEdit,
  FiTrash2,
  FiMoreVertical,
} from "react-icons/fi";
import { CSVLink } from "react-csv";

export default function CommonTable({
  type = "customers",
  data = [],
  onEdit,
  onDelete,
  onView,
  showExport = true,
  showActions = true,
  onRowClick,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  searchable = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // Define headers based on types
  const headersByType = {
    departments: [
      { header: "ID", accessor: "id", sortable: true },
      { header: "Department Name", accessor: "name", sortable: true },
      { header: "Manager", accessor: "managerName", sortable: true },
      { header: "Actions", accessor: "actions", sortable: false },
    ],

    customers: [
      { header: "ID", accessor: "id", sortable: true },
      { header: "Name", accessor: "name", sortable: true },
      { header: "Email", accessor: "email", sortable: true },
      { header: "Phone", accessor: "phone", sortable: false },
      { header: "Industry", accessor: "industry", sortable: true },
      { header: "Type", accessor: "type", sortable: true },
      { header: "Status", accessor: "status", sortable: true },
      { header: "Total Contacts", accessor: "totalContacts", sortable: true },
      { header: "Assigned To", accessor: "assignedUserName", sortable: true },
      { header: "Department", accessor: "departmentName", sortable: true },
      { header: "Created", accessor: "createdAt", sortable: true },
      { header: "Actions", accessor: "actions", sortable: false },
    ],
    leads: [
      { header: "ID", accessor: "id", sortable: true },
      { header: "Name", accessor: "name", sortable: true },
      { header: "Email", accessor: "email", sortable: true },
      { header: "Phone", accessor: "phone", sortable: false },
      { header: "Source", accessor: "source", sortable: true },
      { header: "Owner", accessor: "ownerName", sortable: true },
      { header: "Assigned To", accessor: "assignedToName", sortable: true },
      { header: "Department", accessor: "departmentName", sortable: true },
      { header: "Customer ID", accessor: "customerId", sortable: true },
      { header: "Status", accessor: "status", sortable: true },
      { header: "Created", accessor: "createdAt", sortable: true },
      { header: "Actions", accessor: "actions", sortable: false },
    ],
    Contact: [
      { header: "ID", accessor: "id", sortable: true },
      { header: "Customer ID", accessor: "customer_id", sortable: true },
      { header: "First Name", accessor: "firstname", sortable: true },
      { header: "Last Name", accessor: "lastname", sortable: true },
      { header: "Email", accessor: "email", sortable: true },
      { header: "Phone", accessor: "phone", sortable: false },
      { header: "Status", accessor: "status", sortable: true },
      { header: "Role", accessor: "role", sortable: true },
      { header: "Primary", accessor: "is_primary", sortable: true },
      { header: "Actions", accessor: "actions", sortable: false },
    ],
    users: [
      { header: "ID", accessor: "id", sortable: true },
      { header: "Name", accessor: "name", sortable: true },
      { header: "Email", accessor: "email", sortable: true },
      { header: "Role", accessor: "roleKey", sortable: true },
      { header: "Job Title", accessor: "jobTitle", sortable: true },
      { header: "Department", accessor: "department", sortable: true },
      { header: "Created At", accessor: "createdAt", sortable: true },
      { header: "Actions", accessor: "actions", sortable: false },
    ],
    contacts: [
      { header: "ID", accessor: "id", sortable: true },
      { header: "Name", accessor: "name", sortable: true },
      { header: "Email", accessor: "email", sortable: true },
      { header: "Phone", accessor: "phone", sortable: false },
      { header: "Company", accessor: "company", sortable: true },
      { header: "Status", accessor: "status", sortable: true },
      { header: "Actions", accessor: "actions", sortable: false },
    ],
    tickets: [
      { header: "ID", accessor: "id", sortable: true },
      { header: "Title", accessor: "title", sortable: true },
      { header: "Priority", accessor: "priority", sortable: true },
      { header: "Status", accessor: "status", sortable: true },
      { header: "Type", accessor: "type", sortable: true },
      { header: "Assignee", accessor: "assignee", sortable: true },
      { header: "Reporter", accessor: "reporter", sortable: true },
      { header: "Customer", accessor: "customerName", sortable: true },
      { header: "Created", accessor: "createdAt", sortable: true },
      { header: "Due Date", accessor: "dueDate", sortable: true },
      { header: "Actions", accessor: "actions", sortable: false },
    ],
    proposals: [
      { header: "ID", accessor: "id" },
      { header: "Customer Id", accessor: "customer_id" },
      { header: "Department Id", accessor: "departmentId" },
      { header: "Description", accessor: "description" },
      { header: "Budget", accessor: "budget" },
      { header: "Status", accessor: "status" },
      { header: "Deadline", accessor: "deadline" },
    ],
    tasks: [
      { header: "ID", accessor: "id"},
      { header: "Customer ID", accessor: "customerId" },
      { header: "Title", accessor: "title" },
      { header: "Status", accessor: "status" },
      { header: "Assigned ID", accessor: "assignee_id" },
      { header: "Department Id", accessor: "departmentId" },
      { header: "Due Date", accessor: "dueDate" },
    ],
  };

  const columns = headersByType[type] || [];

  // Filter data based on search term
  const filteredData = searchTerm
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const sortableColumn = columns.find((col) => col.accessor === sortColumn);
    if (!sortableColumn || !sortableColumn.sortable) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Handle export
  const exportData = sortedData.map((item) => {
    const exportItem = {};
    columns.forEach((col) => {
      if (col.accessor !== "actions") {
        exportItem[col.header] = item[col.accessor];
      }
    });
    return exportItem;
  });

  // Status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
      new: { color: "bg-blue-100 text-blue-800", label: "New" },
      prospect: { color: "bg-yellow-100 text-yellow-800", label: "Prospect" },
      lost: { color: "bg-red-100 text-red-800", label: "Lost" },
      open: { color: "bg-blue-100 text-blue-800", label: "Open" },
      in_progress: {
        color: "bg-yellow-100 text-yellow-800",
        label: "In Progress",
      },
      resolved: { color: "bg-green-100 text-green-800", label: "Resolved" },
      closed: { color: "bg-gray-100 text-gray-800", label: "Closed" },
      high: { color: "bg-red-100 text-red-800", label: "High" },
      medium: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
      low: { color: "bg-green-100 text-green-800", label: "Low" },
    };

    const config = statusConfig[status?.toLowerCase()] || {
      color: "bg-gray-100 text-gray-800",
      label: status,
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  // Priority badge styling
  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800", label: "High" },
      medium: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
      low: { color: "bg-green-100 text-green-800", label: "Low" },
    };

    const config = priorityConfig[priority?.toLowerCase()] || {
      color: "bg-gray-100 text-gray-800",
      label: priority,
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      {/* Table Header with Search and Export */}
      <div className="p-4 border-b bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {searchable && (
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
              />
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          )}

          {onSelectAll && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedRows.length === data.length}
                onChange={onSelectAll}
                className="h-4 w-4 text-cyan focus:ring-cyan border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Select All</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showExport && (
            <CSVLink
              data={exportData}
              filename={`${type}-export-${
                new Date().toISOString().split("T")[0]
              }.csv`}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              <FiDownload /> Export CSV
            </CSVLink>
          )}

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {onSelectRow && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="h-4 w-4 text-cyan" />
                </th>
              )}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => col.sortable && handleSort(col.accessor)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="text-gray-400">
                        {sortColumn === col.accessor
                          ? sortDirection === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onSelectRow ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <div className="text-4xl mb-4">📭</div>
                    <p className="text-lg font-medium mb-2">No records found</p>
                    <p className="text-sm">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`hover:bg-gray-50 transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${selectedRows.includes(row.id) ? "bg-blue-50" : ""}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {onSelectRow && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => onSelectRow(row.id, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 text-cyan focus:ring-cyan border-gray-300 rounded"
                      />
                    </td>
                  )}

                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {col.accessor === "actions" && showActions ? (
                        <div className="flex gap-2">
                          {onView && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onView(row);
                              }}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              title="View"
                            >
                              <FiEye />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(row);
                              }}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                              title="Edit"
                            >
                              <FiEdit />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(row);
                              }}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                          <button
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                            title="More"
                          >
                            <FiMoreVertical />
                          </button>
                        </div>
                      ) : col.accessor === "status" ? (
                        getStatusBadge(row[col.accessor])
                      ) : col.accessor === "priority" ? (
                        getPriorityBadge(row[col.accessor])
                      ) : col.accessor === "totalValue" ? (
                        <span className="font-medium">
                          ₹{row[col.accessor]?.toLocaleString("en-IN") || "0"}
                        </span>
                      ) : col.accessor === "createdAt" ||
                        col.accessor === "lastContact" ||
                        col.accessor === "dueDate" ? (
                        <span className="text-gray-600">
                          {row[col.accessor]
                            ? new Date(row[col.accessor]).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}
                        </span>
                      ) : col.accessor === "is_primary" ? (
                        row[col.accessor] ? (
                          "Yes"
                        ) : (
                          "No"
                        )
                      ) : (
                        row[col.accessor] || "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + rowsPerPage, sortedData.length)}
            </span>{" "}
            of <span className="font-medium">{sortedData.length}</span> results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 border rounded-lg text-sm ${
                    currentPage === pageNum
                      ? "bg-cyan text-white border-cyan"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
