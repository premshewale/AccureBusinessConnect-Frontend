import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonDetails from "../../../components/common/CommonDetails.jsx";
import ConvertToCustomerPopup from "./ConvertToCustomerPopup.jsx";
import { LEAD_SOURCE_OPTIONS, LEAD_STATUS_OPTIONS } from "../../../constants/leadEnums.js";

import { adminGetLeadByIdApi } from "../../../services/lead/adminGetLeadByIdApi";
import { resetLeadDetails } from "../../../slices/lead/adminGetLeadByIdSlice";
import { adminUpdateLeadApi } from "../../../services/lead/adminUpdateLeadApi";
import { adminDeleteLeadApi } from "../../../services/lead/adminDeleteLeadApi";
import { resetDeleteLeadState } from "../../../slices/lead/adminDeleteLeadSlice";
import { adminConvertLeadApi } from "../../../services/lead/adminConvertLeadApi";
import { resetConvertLeadState } from "../../../slices/lead/adminConvertLeadSlice";
import { showError, showSuccess } from "../../../utils/toast"; // ✅ toast utils

export default function LeadDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, lead, error } = useSelector((state) => state.adminGetLeadById);
  const { role } = useSelector((state) => state.auth);

  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showConvertPopup, setShowConvertPopup] = useState(false);

  /* =======================
     FETCH LEAD
  ======================= */
  useEffect(() => {
    dispatch(adminGetLeadByIdApi(id));
    return () => {
      dispatch(resetLeadDetails());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (lead) {
      setEditedData({
        id: lead.id || "",
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        source: lead.source || "",
        status: lead.status || "",
        ownerName: lead.ownerName || "",
        assignedToName: lead.assignedToName || "",
        departmentName: lead.departmentName || "",
        customerId: lead.customerId || "",
        createdAt: lead.createdAt || "",
        updatedAt: lead.updatedAt || "",
      });
    }
  }, [lead]);

  if (loading)
    return <p className="mt-6 text-gray-500 text-center">Loading lead details...</p>;
  if (error) return <p className="mt-6 text-red-500 text-center">{error}</p>;
  if (!lead) return null;

  /* =======================
     LEAD FIELDS
  ======================= */
  const leadFields = [
    { name: "id", label: "ID", readOnly: true },
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "source", label: "Source", type: "select", options: LEAD_SOURCE_OPTIONS },
    { name: "status", label: "Status", type: "select", options: LEAD_STATUS_OPTIONS, readOnly: true },
    { name: "ownerName", label: "Owner", readOnly: true },
    { name: "assignedToName", label: "Assigned To", readOnly: true },
    { name: "departmentName", label: "Department", readOnly: true },
    { name: "customerId", label: "Customer ID", readOnly: true },
    { name: "createdAt", label: "Created At", readOnly: true, format: (val) => val ? new Date(val).toLocaleString("en-IN") : "N/A" },
    { name: "updatedAt", label: "Last Updated", readOnly: true, format: (val) => val ? new Date(val).toLocaleString("en-IN") : "N/A" },
  ];

  const formattedLead = { ...editedData };
  leadFields.forEach((field) => {
    if (field.format && formattedLead[field.name]) {
      formattedLead[field.name] = field.format(formattedLead[field.name]);
    }
  });

  /* =======================
     VALIDATION
  ======================= */
  const validateLead = (data) => {
    if (!data.name || data.name.trim().length < 3) {
      showError("Name must be at least 3 characters");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      showError("Please enter a valid email address");
      return false;
    }
    if (!data.phone || data.phone.trim().length < 10) {
      showError("Phone number must be at least 10 digits");
      return false;
    }
    if (!data.source) {
      showError("Please select a lead source");
      return false;
    }
    if (!data.status) {
      showError("Please select a lead status");
      return false;
    }
    return true;
  };

  /* =======================
     HANDLERS
  ======================= */
  const handleEdit = () => setIsEditMode(true);
  const handleCancelEdit = () => setIsEditMode(false);

  const handleSave = async () => {
    if (!validateLead(editedData)) return; // ✅ validation

    try {
      await dispatch(adminUpdateLeadApi({ id, payload: editedData })).unwrap();
      showSuccess("Lead updated successfully"); // ✅ success toast
      navigate(`/${rolePath}/leads`);
    } catch (err) {
      showError(err?.message || "Failed to update lead"); // ✅ error toast
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await dispatch(adminDeleteLeadApi(id)).unwrap();
      showSuccess("Lead deleted successfully"); // ✅ success toast
      navigate(`/${rolePath}/leads`);
      dispatch(resetDeleteLeadState());
    } catch (err) {
      showError(err?.message || "Failed to delete lead"); // ✅ error toast
    }
  };

  const handleConvert = () => setShowConvertPopup(true);

  const handleConvertSubmit = async (payload) => {
    try {
      await dispatch(adminConvertLeadApi({
        leadId: payload.leadId,
        payload: {
          customerType: payload.customerType,
          industry: payload.industry,
          address: payload.address,
          website: payload.website,
        },
      })).unwrap();
      showSuccess("Lead converted to customer successfully"); // ✅ success toast
      setShowConvertPopup(false);
      dispatch(adminGetLeadByIdApi(id));
      dispatch(resetConvertLeadState());
    } catch (err) {
      showError(err?.message || "Failed to convert lead"); // ✅ error toast
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <CommonDetails
        title="Lead Details"
        data={formattedLead}
        fields={leadFields}
        isEditMode={isEditMode}
        editedData={editedData}
        setEditedData={setEditedData}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancelEdit}
        onDelete={handleDelete}
        onConvert={handleConvert}
        showConvert={!isEditMode}
      />

      <ConvertToCustomerPopup
        open={showConvertPopup}
        leadId={lead.id}
        onClose={() => setShowConvertPopup(false)}
        onSubmit={handleConvertSubmit}
      />
    </div>
  );
}
