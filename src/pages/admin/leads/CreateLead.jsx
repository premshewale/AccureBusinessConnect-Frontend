import CommonForm from "../../../components/common/CommonForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminCreateLead } from "../../../services/lead/adminCreateLeadApi";
import { resetAdminCreateLead } from "../../../slices/lead/adminCreateLeadSlice";
import { showError, showSuccess } from "../../../utils/toast";

export default function CreateLead() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector(
    (state) => state.adminCreateLead
  );

  const fields = [
    { type: "text", label: "Name", name: "name", placeholder: "Enter name" },
    { type: "email", label: "Email", name: "email", placeholder: "Enter email" },
    { type: "tel", label: "Phone", name: "phone", placeholder: "Enter phone" },
    {
      type: "select",
      label: "Source",
      name: "source",
      options: [
        { label: "Website", value: "WEBSITE" },
        { label: "Referral", value: "REFERRAL" },
        { label: "Campaign", value: "CAMPAIGN" },
        { label: "Walk-in", value: "WALKIN" },
        { label: "Call", value: "CALL" },
      ],
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      options: [
        { label: "New", value: "NEW" },
        { label: "Contacted", value: "CONTACTED" },
        { label: "Qualified", value: "QUALIFIED" },
        { label: "Lost", value: "LOST" },
        { label: "Won", value: "WON" },
      ],
    },
    { type: "number", label: "Owner ID", name: "ownerId" },
    { type: "number", label: "Department ID", name: "departmentId" },
  ];

  // ✅ validations (added only)
  const validateForm = (data) => {
    if (!data.name || data.name.trim().length < 3) {
      showError("Name must be at least 3 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      showError("Please enter a valid email address");
      return false;
    }

    if (!data.phone || data.phone.length < 10) {
      showError("Phone number must be at least 10 digits");
      return false;
    }

    if (!data.source) {
      showError("Please select a lead source");
      return false;
    }

    if (!data.status) {
      showError("Please select lead status");
      return false;
    }

    if (!data.ownerId || Number(data.ownerId) <= 0) {
      showError("Owner ID must be greater than 0");
      return false;
    }

    if (!data.departmentId || Number(data.departmentId) <= 0) {
      showError("Department ID must be greater than 0");
      return false;
    }

    return true;
  };

  const handleSubmit = (data) => {
    if (!validateForm(data)) return;
    dispatch(adminCreateLead(data));
  };

  useEffect(() => {
    if (success) {
      showSuccess("Lead created successfully");
      dispatch(resetAdminCreateLead());
      navigate("/admin/leads");
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      showError(
        typeof error === "string" ? error : error.message || "Something went wrong"
      );
    }
  }, [error]);

  return (
    <>
      {error && (
        <p className="text-red-500 mb-2 text-sm">{error}</p>
      )}

      <CommonForm
        title="Create Lead"
        submitText={loading ? "Creating..." : "Create Lead"}
        fields={fields}
        onSubmit={handleSubmit}
        disabled={loading}
      />
    </>
  );
}
