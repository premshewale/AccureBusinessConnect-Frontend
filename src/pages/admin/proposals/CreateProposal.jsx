import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../../../components/common/CommonForm";
import { adminCreateProposalApi } from "../../../services/proposal/adminCreateProposalApi";
import { showError, showSuccess } from "../../../utils/toast";

export default function CreateProposal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, role } = useSelector((state) => state.auth);
  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  const { loading } = useSelector(
    (state) => state.adminCreateProposal
  );

  /* -------------------- VALIDATION -------------------- */
  const validateForm = (data) => {
    if (!data.customerId || Number(data.customerId) <= 0) {
      showError("Customer ID must be greater than 0");
      return false;
    }

    if (!data.description || data.description.trim().length < 5) {
      showError("Description must be at least 5 characters");
      return false;
    }

    if (data.budget && Number(data.budget) <= 0) {
      showError("Budget must be greater than 0");
      return false;
    }

    if (!data.deadline) {
      showError("Deadline is required");
      return false;
    }

    return true;
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (data) => {
    if (!validateForm(data)) return;

    const payload = {
      customerId: Number(data.customerId),
      departmentId: data.departmentId
        ? Number(data.departmentId)
        : null,
      description: data.description.trim(),
      budget: data.budget ? Number(data.budget) : null,
      deadline: data.deadline,
      ownerId: user?.id,
    };

    try {
      await dispatch(adminCreateProposalApi(payload)).unwrap();

      showSuccess("Proposal created successfully 🎉");
      navigate(`/${rolePath}/proposals`);
    } catch (err) {
      showError(
        typeof err === "string"
          ? err
          : err?.message || "Failed to create proposal"
      );
    }
  };

  /* -------------------- FIELDS -------------------- */
  const fields = [
    { name: "customerId", label: "Customer ID", type: "number", required: true },
    { name: "departmentId", label: "Department ID", type: "number" },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "budget", label: "Budget (₹)", type: "number" },
    { name: "deadline", label: "Deadline", type: "date", required: true },
  ];

  /* -------------------- UI -------------------- */
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Create Proposal
      </h1>
      <p className="text-gray-600 mb-6">
        Draft a new proposal for a customer
      </p>

      <CommonForm
        title="Proposal Information"
        subtitle="Fill proposal details"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={loading ? "Creating..." : "Create Proposal"}
        onBack={() => navigate(`/${rolePath}/proposals`)}
      />
    </div>
  );
}
