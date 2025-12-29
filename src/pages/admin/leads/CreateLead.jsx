import CommonForm from "../../../components/common/CommonForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminCreateLead } from "../../../services/lead/adminCreateLeadApi";
import { resetAdminCreateLead } from "../../../slices/lead/adminCreateLeadSlice";

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

  const handleSubmit = (data) => {
    dispatch(adminCreateLead(data));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetAdminCreateLead());
      navigate("/admin/leads");
    }
  }, [success, dispatch, navigate]);

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
