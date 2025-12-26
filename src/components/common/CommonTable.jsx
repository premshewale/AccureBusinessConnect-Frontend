import React from "react";

export default function CommonTable({
  type = "leads" ,
  data = [],
  onStatusToggle,
}) {
  const headersByType = {
    departments: [
      { header: "ID", accessor: "id" },
      { header: "Department Name", accessor: "name" },
      { header: "Created At", accessor: "createdAt" },
    ],

    leads: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Phone", accessor: "phone" },
      { header: "Source", accessor: "source" },
      { header: "Status", accessor: "status" },
      { header: "AssignedTo", accessor: "assigned_to" },
      { header: "CustomerId", accessor: "customer_id" },
      { header: "DepartmentId", accessor: "department_id" },
    ],

    Contact: [
      { header: "ID", accessor: "id" },
      { header: "Customer_Id", accessor: "customer_id" },
      { header: "FirstName", accessor: "firstname" },
      { header: "LastnameName", accessor: "lastname" },
      { header: "Email", accessor: "email" },
      { header: "Phone", accessor: "phone" },
      { header: "Status", accessor: "status" },
      { header: "Role", accessor: "role" },
      { header: "Primary", accessor: "is_primary" },
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

    staff: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Job Title", accessor: "jobTitle" },
      { header: "Role", accessor: "roleKey" },
      { header: "Department ID", accessor: "departmentId" },
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
            data.map((row, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                {columns.map((col, cidx) => (
                  <td key={cidx} className="px-4 py-2 text-sm text-gray-700">
                    {col.accessor === "actions" ? (
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                          onClick={() => console.log("Edit", row.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                          onClick={() => console.log("Delete", row.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : col.accessor === "status" ? (
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={row.status === "ACTIVE"}
                          onChange={() =>
                            onStatusToggle &&
                            onStatusToggle(
                              row.id,
                              row.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                            )
                          }
                        />
                        {/* <div
                          className="relative w-11 h-6 bg-gray-300 rounded-full peer
      peer-checked:bg-green-500
      after:content-[''] after:absolute after:top-0.5 after:left-0.5
      after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all
      peer-checked:after:translate-x-full"
                        /> */}
                        <span className="ml-2 text-xs font-medium text-gray-700">
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
