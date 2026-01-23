import React from "react";
import CommonTable from "../../../components/common/CommonTable";

export default function CustomerReports() {
  // Dummy data (replace with API later)
  const customerLeads = [
    { id: 1, customerName: "Tata Motors", totalLeads: 32 },
    { id: 2, customerName: "Reliance", totalLeads: 18 },
    { id: 3, customerName: "Infosys", totalLeads: 25 },
    { id: 4, customerName: "Mahindra", totalLeads: 10 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Leads by Customer
      </h2>

      <CommonTable
        type="customerReport"
        data={customerLeads}
        searchable={true}
        showExport={true}
        showActions={false}
      />
    </div>
  );
}
