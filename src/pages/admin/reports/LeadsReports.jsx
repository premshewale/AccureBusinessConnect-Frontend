import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../../components/common/CommonTable";
import { adminGetLeadsReport } from "../../../services/reports/adminGetLeadsReportApi";

export default function LeadsReports() {
  const dispatch = useDispatch();

  const { leads, loading, error } = useSelector(
    (state) => state.adminLeadsReport
  );

  useEffect(() => {
    dispatch(adminGetLeadsReport());
  }, [dispatch]);

  // Map API response → table format (if needed)
  const tableData = leads.map((lead) => ({
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    source: lead.source,
    status: lead.status,
    createdAt: new Date(lead.createdAt).toLocaleDateString("en-IN"),
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Leads Created Report
      </h2>

      {loading && <p>Loading leads...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <CommonTable
        type="leadsReport"
        data={tableData}
        searchable={true}
        showExport={true}
        showActions={false}
      />
    </div>
  );
}
