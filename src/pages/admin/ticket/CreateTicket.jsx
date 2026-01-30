import React from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { createTicketThunk } from "../../../services/ticket/createTicketApi";

export default function CreateTicket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.createTicket);
  const { role } = useSelector((state) => state.auth.user);
  const rolePath = role?.toLowerCase() || "admin"; // fallback to "admin"

  // ✅ Submit handler
  const handleSubmit = async (data) => {
    try {
      const payload = {
        customerId: Number(data.customerId),
        contactId: Number(data.customerId), // same as backend expects
        subject: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
      };

      await dispatch(createTicketThunk(payload)).unwrap();

      alert("Ticket created successfully!");
      navigate(`/${rolePath}/ticket`); // ✅ role-based navigation
    } catch (error) {
      console.error(error);
      alert("Failed to create ticket");
    }
  };

  // ✅ Form fields
  const fields = [
    {
      type: "number",
      label: "Customer ID",
      name: "customerId",
      placeholder: "Enter customer ID",
      required: true,
    },
    {
      type: "text",
      label: "Title",
      name: "title",
      placeholder: "Enter ticket subject",
      required: true,
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      placeholder: "Describe the issue",
      required: true,
      rows: 4,
    },
    {
      type: "select",
      label: "Priority",
      name: "priority",
      required: true,
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
      required: true,
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
        <h1 className="text-2xl font-bold text-gray-800">Create New Ticket</h1>
        <p className="text-gray-600">Add a new support ticket</p>
      </div>

      <CommonForm
        title="Ticket Information"
        subtitle="Fill the details to create a support ticket"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={loading ? "Creating..." : "Create Ticket"}
        onBack={() => navigate(`/${rolePath}/tickets`)} // ✅ optional back button
      />
    </div>
  );
}
