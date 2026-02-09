import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ShowDetails from "../../../components/common/ShowDetails.jsx";
import { adminGetLeadByIdApi } from "../../../services/lead/adminGetLeadByIdApi";
import { resetLeadDetails } from "../../../slices/lead/adminGetLeadByIdSlice";

export default function ShowLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { lead, loading, error } = useSelector(
    (state) => state.adminGetLeadById
  );
  const { role } = useSelector((state) => state.auth);

  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  /* =======================
     FETCH LEAD
  ======================= */
  useEffect(() => {
    if (id) dispatch(adminGetLeadByIdApi(id));

    return () => {
      dispatch(resetLeadDetails());
    };
  }, [dispatch, id]);

  /* =======================
     STATES
  ======================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-t-2 border-cyan rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-6">
        {typeof error === "string" ? error : "Failed to fetch lead details"}
      </p>
    );
  }

  if (!lead) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Lead not found
      </p>
    );
  }

  /* =======================
     FORMAT DATA
  ======================= */
  const formattedLead = {
    ID: lead.id,
    Name: lead.name || "-",
    Email: lead.email || "-",
    Phone: lead.phone || "-",
    Source: lead.source?.replace("_", " ") || "-",
    Status: lead.status?.replace("_", " ") || "-",
    Owner: lead.ownerName || "-",
    Assigned_To: lead.assignedToName || "-",
    Department: lead.departmentName || "-",
    Customer_ID: lead.customerId || "-",
    Created_At: lead.createdAt
      ? new Date(lead.createdAt).toLocaleString("en-IN")
      : "-",
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(`/${rolePath}/leads`)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      {/* Lead Details */}
      <ShowDetails title="Lead Details" data={formattedLead} />
    </div>
  );
}
