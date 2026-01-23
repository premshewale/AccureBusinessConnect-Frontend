import React from "react";
import CommonTable from "../../../components/common/CommonTable";

export default function LeadsReports() {
  // Dummy API response (replace later)
  const leadsByStaff = [
    { id: 1, staffName: "Rahul Sharma", leadsCount: 25 },
    { id: 2, staffName: "Anita Verma", leadsCount: 18 },
    { id: 3, staffName: "Karan Singh", leadsCount: 32 },
    { id: 4, staffName: "Neha Patel", leadsCount: 15 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Leads Created by Staff
      </h2>

      <CommonTable
        type="leadsReport"
        data={leadsByStaff}
        searchable={true}
        showExport={true}
        showActions={false}
      />
    </div>
  );
}
