import React from "react";

export default function CommonTable({ type = "leads", data }) {
  // Define headers based on type
  const headersByType = {
    leads: [
      { header: "ID", accessor: "id" },
      { header: "Name", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Phone", accessor: "phone" },
      { header: "Source", accessor: "source" },
      { header: "Owner Id", accessor: "ownerId" },
      { header: "Department Id", accessor: "departmentId" },
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
                    {row[col.accessor]}
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
