import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { useCustomers } from "../../../contexts/CustomerContext";
import { useDispatch, useSelector } from "react-redux";
import { createTicketThunk } from "../../../slices/ticket/createTicketSlice";

export default function CreateTicket() {
  const navigate = useNavigate();
  const { customers } = useCustomers();
  const [formLoading, setFormLoading] = useState(false);

  const dispatch = useDispatch();
  const { ticket, loading, error } = useSelector((state) => state.createTicket);

  const handleSubmit = async (data) => {
    setFormLoading(true);

    try {
      // Find customer name from ID
      const customer = customers.find((c) => c.id === Number(data.customerId));

      const ticketData = {
        ...data,
        customerName: customer?.name || "Unknown Customer",
        customerId: Number(data.customerId),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        status: data.status || "open",
        priority: data.priority || "medium",
        type: data.type || "technical",
      };

      // Dispatch Redux thunk
      await dispatch(createTicketThunk(ticketData));

      alert("Ticket created successfully!");
      navigate("/admin/ticket");
    } catch (err) {
      alert("Failed to create ticket. Please try again.");
      console.error("Create ticket error:", err);
    } finally {
      setFormLoading(false);
    }
  };

  // Fields for ticket creation
  const fields = [
    { type: "text", label: "Title", name: "title", placeholder: "Enter ticket title", required: true },
    { type: "textarea", label: "Description", name: "description", placeholder: "Describe the issue", required: true, rows: 4 },
    {
      type: "select",
      label: "Priority",
      name: "priority",
      required: true,
      options: [
        { label: "Select Priority", value: "" },
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
      ],
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      options: [
        { label: "Select Status", value: "" },
        { label: "Open", value: "open" },
        { label: "In Progress", value: "in_progress" },
        { label: "Resolved", value: "resolved" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      type: "select",
      label: "Type",
      name: "type",
      options: [
        { label: "Select Type", value: "" },
        { label: "Technical", value: "technical" },
        { label: "Billing", value: "billing" },
        { label: "Performance", value: "performance" },
        { label: "Bug", value: "bug" },
        { label: "Feature", value: "feature" },
        { label: "Reporting", value: "reporting" },
      ],
    },
    { type: "text", label: "Assignee", name: "assignee", placeholder: "Enter assignee name" },
    {
      type: "select",
      label: "Customer",
      name: "customerId",
      required: true,
      options: [
        { label: "Select Customer", value: "" },
        ...customers.map((customer) => ({
          label: `${customer.name}${customer.company ? ` (${customer.company})` : ""}`,
          value: customer.id.toString(),
        })),
      ],
    },
    { type: "text", label: "Reporter", name: "reporter", placeholder: "Enter reporter name" },
    { type: "date", label: "Due Date", name: "dueDate", required: true },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Ticket</h1>
        <p className="text-gray-600">Add a new support ticket</p>
      </div>

      <CommonForm
        title="Ticket Information"
        subtitle="Fill in the details below to create a new support ticket"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Creating..." : "Create Ticket"}
      />
    </div>
  );
}
