import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../../components/common/CommonTable";
import { adminGetCustomersReport } from "../../../services/reports/adminGetCustomersReportApi";

export default function CustomerReports() {
  const dispatch = useDispatch();

  const { customers, loading } = useSelector(
    (state) => state.adminCustomersReport
  );

  useEffect(() => {
    dispatch(adminGetCustomersReport());
  }, [dispatch]);

  // ✅ normalize customers safely (array guard)
  const customersArray = Array.isArray(customers)
    ? customers
    : customers?.content || customers?.data || [];

  // 🔁 normalize for CommonTable
  const tableData = customersArray.map((c) => ({
    ...c,
    totalContacts: c.contactPersonCount ?? 0,
    assignedUserName: c.assignedUser?.name || "-",
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Customers Report
      </h2>

      <CommonTable
        type="customerReport"
        data={tableData}
        searchable={true}
        showExport={true}
        showActions={false}
      />

      {loading && (
        <p className="mt-4 text-sm text-gray-500">Loading...</p>
      )}
    </div>
  );
}
