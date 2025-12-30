import React from "react";

export default function CommonTable({
  type = "leads",
  data = [],
  onStatusToggle,
  onRowClick,
  onEdit,
  onDelete,
}) {
  const headersByType = {
    departments: [
      { header: "ID", accessor: "id" },
      { header: "Department Name", accessor: "name" },
      { header: "Created At", accessor: "createdAt" },
      { header: "Actions", accessor: "actions" },
    ],

    leads: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Phone", accessor: "phone" },
      { header: "Source", accessor: "source" },
      { header: "Status", accessor: "status" },
      { header: "Owner", accessor: "ownerName" },
      { header: "Assigned To", accessor: "assignedToName" },
      { header: "Department", accessor: "departmentName" },
      { header: "Customer ID", accessor: "customerId" },
      { header: "Created At", accessor: "createdAt" },
    ],

    users: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Job Title", accessor: "jobTitle" },
      { header: "Role", accessor: "roleName" },
      { header: "Department", accessor: "departmentName" },
      { header: "Phone Ext.", accessor: "phoneExtension" },
      { header: "Status", accessor: "status" },
      { header: "Actions", accessor: "actions" },
    ],
  };

  const columns = headersByType[type] || [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead className="bg-[#EAECEC] sticky top-0">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="text-left text-base font-normal text-[#1e1e1e] px-4 py-2"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition-colors"
                onClick={() => onRowClick && onRowClick(row.id)}
              >
                {columns.map((col, cidx) => (
                  <td key={cidx} className="px-4 py-2 text-sm text-gray-700">
                    {/* ACTIONS */}
                    {col.accessor === "actions" ? (
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => onEdit && onEdit(row.id)}
                          className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete && onDelete(row.id)}
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    ) : col.accessor === "status" ? (
                      <label
                        className="inline-flex items-center gap-2 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={row.status === "ACTIVE"}
                          onChange={(e) =>
                            onStatusToggle &&
                            onStatusToggle(
                              row.id,
                              e.target.checked ? "ACTIVE" : "INACTIVE"
                            )
                          }
                        />
                        <span className="text-xs font-medium text-gray-700">
                          {row.status}
                        </span>
                      </label>
                    ) : (
                      row[col.accessor] ?? "-"
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
