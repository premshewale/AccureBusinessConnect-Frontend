import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LEAD_SOURCE_OPTIONS,
  LEAD_STATUS_OPTIONS,
} from "../../../constants/leadEnums.js";

import CommonDetails from "../../../components/common/CommonDetails.jsx";
import ConvertToCustomerPopup from "./ConvertToCustomerPopup.jsx";

import { adminGetLeadByIdApi } from "../../../services/lead/adminGetLeadByIdApi";
import { resetLeadDetails } from "../../../slices/lead/adminGetLeadByIdSlice";
import { adminUpdateLeadApi } from "../../../services/lead/adminUpdateLeadApi";
import { adminDeleteLeadApi } from "../../../services/lead/adminDeleteLeadApi";
import { resetDeleteLeadState } from "../../../slices/lead/adminDeleteLeadSlice";
import { adminConvertLeadApi } from "../../../services/lead/adminConvertLeadApi";
import { resetConvertLeadState } from "../../../slices/lead/adminConvertLeadSlice";



export default function LeadDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, lead, error } = useSelector(
    (state) => state.adminGetLeadById
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showConvertPopup, setShowConvertPopup] = useState(false);

  useEffect(() => {
  
    dispatch(adminGetLeadByIdApi(id));
    return () => {
      dispatch(resetLeadDetails());
    };
  }, [dispatch, id]);

  if (loading)
    return (
      <p className="mt-6 text-gray-500 text-center">
        Loading lead details...
      </p>
    );

  if (error)
    return <p className="mt-6 text-red-500 text-center">{error}</p>;

  if (!lead) return null;

  const leadFields = [
    { name: "id", label: "ID", readOnly: true },
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    {
      name: "source",
      label: "Source",
      type: "select",
      options: LEAD_SOURCE_OPTIONS,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: LEAD_STATUS_OPTIONS,
    },
    { name: "ownerName", label: "Owner", readOnly: true },
    { name: "assignedToName", label: "Assigned To", readOnly: true },
    { name: "departmentName", label: "Department", readOnly: true },
    { name: "customerId", label: "Customer ID", readOnly: true },
    {
      name: "createdAt",
      label: "Created At",
      readOnly: true,
      format: (val) => new Date(val).toLocaleString(),
    },
  ];

  const formattedLead = { ...lead };
  leadFields.forEach((field) => {
    if (field.format && formattedLead[field.name]) {
      formattedLead[field.name] = field.format(formattedLead[field.name]);
    }
  });

  /* =======================
     HANDLERS
  ======================= */

  const handleEdit = () => {
    setEditedData(lead); // prefill editable data
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedData({});
  };

  const handleSave = async () => {
    try {
      await dispatch(adminUpdateLeadApi({ id, payload: editedData })).unwrap();
      // Re-fetch updated lead
      dispatch(adminGetLeadByIdApi(id));
      alert("Lead updated successfully");
      setIsEditMode(false);
    } catch (err) {
      alert(err || "Failed to update lead");
    }
  };

// Inside component
const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this lead?")) return;

  try {
    await dispatch(adminDeleteLeadApi(id)).unwrap();
    alert("Lead deleted successfully");
    navigate("/admin/leads");
    dispatch(resetDeleteLeadState());
  } catch (err) {
    alert(err || "Failed to delete lead");
  }
};
  const handleConvert = () => {
    setShowConvertPopup(true);
  };


  const handleConvertSubmit = async (payload) => {
  try {
    await dispatch(
      adminConvertLeadApi({
        leadId: payload.leadId,
        payload: {
          customerType: payload.customerType,
          industry: payload.industry,
          address: payload.address,
          website: payload.website,
        },
      })
    ).unwrap();

    alert("Lead converted to customer successfully");
    setShowConvertPopup(false);

    // Optional refresh
    dispatch(adminGetLeadByIdApi(id));
    dispatch(resetConvertLeadState());
  } catch (err) {
    alert(err || "Failed to convert lead");
  }
};


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
