import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonForm from "../../../components/common/CommonForm.jsx";
import { createTicketThunk } from "../../../services/ticket/createTicketApi";
import { showError, showSuccess } from "../../../utils/toast";

export default function CreateTicket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.createTicket);
  const { role } = useSelector((state) => state.auth.user || {});
  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  // ✅ validation
  const validateForm = (data) => {
    if (!data.customerId || Number(data.customerId) <= 0) {
      showError("Customer ID must be greater than 0");
      return false;
    }

    if (!data.title || data.title.trim().length < 3) {
      showError("Title must be at least 3 characters");
      return false;
    }

    if (!data.description || data.description.trim().length < 5) {
      showError("Description must be at least 5 characters");
      return false;
    }

    if (!data.priority) {
      showError("Please select ticket priority");
      return false;
    }

    if (!data.status) {
      showError("Please select ticket status");
      return false;
    }

    return true;
  };

  // ✅ submit handler
  const handleSubmit = async (data) => {
    if (!validateForm(data)) return;

    try {
      const payload = {
        customerId: Number(data.customerId),
        contactId: Number(data.customerId), // backend requirement
        subject: data.title.trim(),
        description: data.description.trim(),
        priority: data.priority,
        status: data.status,
      };

      await dispatch(createTicketThunk(payload)).unwrap();

      showSuccess("Ticket created successfully");
      navigate(`/${rolePath}/ticket`);
    } catch (error) {
      console.error("Create ticket error:", error);
      showError(
        typeof error === "string"
          ? error
          : error?.message || "Failed to create ticket"
      );
    }
  };

  // ✅ form fields
  const fields = [
    {
      type: "number",
      label: "Customer ID",
      name: "customerId",
      placeholder: "Enter customer ID",
      min: 1,
    },
    {
      type: "text",
      label: "Title",
      name: "title",
      placeholder: "Enter ticket subject",
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      placeholder: "Describe the issue",
      rows: 4,
    },
    {
      type: "select",
      label: "Priority",
      name: "priority",
      options: [
        { label: "Select Priority", value: "" },
        { label: "Low", value: "LOW" },
        { label: "Medium", value: "MEDIUM" },
        { label: "High", value: "HIGH" },
        { label: "Critical", value: "CRITICAL" },
      ],
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      options: [
        { label: "Select Status", value: "" },
        { label: "Open", value: "OPEN" },
        { label: "In Progress", value: "IN_PROGRESS" },
        { label: "Resolved", value: "RESOLVED" },
        { label: "Closed", value: "CLOSED" },
      ],
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Create New Ticket
        </h1>
        <p className="text-gray-600">
          Add a new support ticket
        </p>
      </div>

      <CommonForm
        title="Ticket Information"
        subtitle="Fill the details to create a support ticket"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={loading ? "Creating..." : "Create Ticket"}
        disabled={loading}
        onBack={() => navigate(`/${rolePath}/tickets`)}
      />
    </div>
  );
}
