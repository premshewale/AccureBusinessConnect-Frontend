import React, { useState } from "react";

export default function CommonForm({
  title = "Form",
  onSubmit,
  submitText = "Submit",
  fields: customFields, // Optional: subset of fields to render
}) {
  const [formData, setFormData] = useState({});

  // All built-in fields
  const allFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "industry", label: "Industry", type: "text" },
    { name: "type", label: "Type", type: "text" },
    { name: "status", label: "Status", type: "select", options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ]},
    { name: "address", label: "Address", type: "textarea" },
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "role", label: "Role", type: "text" },
    { name: "website", label: "Website", type: "text" },
    { name: "ownerId", label: "Owner Id", type: "text" },
    { name: "departmentId", label: "Department Id", type: "text" },
    { name: "customerId", label: "Customer Id", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "budget", label: "Budget", type: "number" },
    { name: "title", label: "Title", type: "text" },
    { name: "assigneeId", label: "Assignee Id", type: "text" },
    { name: "dueDate", label: "Due Date", type: "date" },
    { name: "contactId", label: "Contact Id", type: "text" },
    { name: "subject", label: "Subject", type: "text" },
    { name: "priority", label: "Priority", type: "select", options: [
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
      ]},
    { name: "issueDate", label: "Issue Date", type: "date" },
    { name: "totalAmount", label: "Total Amount", type: "number" },
    { name: "createdBy", label: "Created By", type: "text" },
    { name: "proposalId", label: "Proposal Id", type: "text" },
    { name: "invoiceId", label: "Invoice Id", type: "text" },
    { name: "method", label: "Method", type: "text" },
    { name: "amount", label: "Amount", type: "number" },
    { name: "paymentDate", label: "Payment Date", type: "date" },
    { name: "category", label: "Category", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "relatedCustomerId", label: "Related Customer Id", type: "text" },
  ];

  // Decide which fields to render: use customFields if provided, otherwise allFields
  const fieldsToRender = customFields || allFields;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Render single field
  const renderField = (field, idx) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "password":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder || ""}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
        );

      case "textarea":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{field.label}</label>
            <textarea
              name={field.name}
              placeholder={field.placeholder || ""}
              value={formData[field.name] || ""}
              onChange={handleChange}
              rows={4}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
        );

      case "select":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{field.label}</label>
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt, oIdx) => (
                <option key={oIdx} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );

      case "date":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{field.label}</label>
            <input
              type="date"
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
        );

      case "file":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{field.label}</label>
            <input
              type="file"
              name={field.name}
              onChange={handleFileChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

      <form onSubmit={handleSubmit} className="grid gap-4">
        {fieldsToRender.map((field, idx) => renderField(field, idx))}

        <button
          type="submit"
          className="bg-cyan text-white py-2 rounded-lg hover:bg-cyan-700 mt-2"
        >
          {submitText}
        </button>
      </form>
    </div>
  );
}
