import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function CommonForm({
  title = "Form",
  subtitle = "", // Added subtitle prop with default value
  onSubmit,
  submitText = "Submit",
  fields: customFields,
  initialData = {},
}) {
  const [formData, setFormData] = useState(initialData);
  const [showPasswordFields, setShowPasswordFields] = useState({});
  const [filePreviews, setFilePreviews] = useState({});

  // Complete field definitions including customer-specific fields
  const allFields = [
    // Basic Fields
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "mobile", label: "Mobile", type: "text" },

    // Customer Specific Fields
    { name: "company", label: "Company", type: "text" },
    { name: "companyWebsite", label: "Company Website", type: "text" },
    {
      name: "industry",
      label: "Industry",
      type: "select",
      options: [
        { label: "Technology", value: "Technology" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Finance", value: "Finance" },
        { label: "Retail", value: "Retail" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Education", value: "Education" },
        { label: "Real Estate", value: "Real Estate" },
        { label: "Hospitality", value: "Hospitality" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      name: "customerType",
      label: "Customer Type",
      type: "select",
      options: [
        { label: "Individual", value: "individual" },
        { label: "Business", value: "business" },
        { label: "Enterprise", value: "enterprise" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Prospect", value: "prospect" },
        { label: "Lead", value: "lead" },
        { label: "Lost", value: "lost" },
      ],
    },
    {
      name: "source",
      label: "Source",
      type: "select",
      options: [
        { label: "Website", value: "website" },
        { label: "Referral", value: "referral" },
        { label: "Social Media", value: "social_media" },
        { label: "Email Campaign", value: "email" },
        { label: "Cold Call", value: "cold_call" },
        { label: "Event", value: "event" },
        { label: "Other", value: "other" },
      ],
    },

    // Address Fields
    { name: "address", label: "Address", type: "textarea" },
    { name: "city", label: "City", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "country", label: "Country", type: "text" },
    { name: "zipCode", label: "Zip Code", type: "text" },

    // Contact Fields
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "jobTitle", label: "Job Title", type: "text" },

    // Finance Fields
    { name: "budget", label: "Budget", type: "number" },
    { name: "creditLimit", label: "Credit Limit", type: "number" },
    { name: "paymentTerms", label: "Payment Terms", type: "text" },

    // Role and Relationships
    { name: "role", label: "Role", type: "text" },
    { name: "website", label: "Website", type: "text" },
    { name: "ownerId", label: "Owner Id", type: "text" },
    { name: "departmentId", label: "Department Id", type: "text" },
    { name: "customerId", label: "Customer Id", type: "text" },

    // Description and Notes
    { name: "description", label: "Description", type: "textarea" },
    { name: "notes", label: "Notes", type: "textarea" },

    // Task/Ticket Fields
    { name: "title", label: "Title", type: "text" },
    { name: "assigneeId", label: "Assignee Id", type: "text" },
    { name: "dueDate", label: "Due Date", type: "date" },
    { name: "contactId", label: "Contact Id", type: "text" },
    { name: "subject", label: "Subject", type: "text" },
    {
      name: "priority",
      label: "Priority",
      type: "select",
      options: [
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
      ],
    },

    // Invoice/Expense Fields
    { name: "issueDate", label: "Issue Date", type: "date" },
    { name: "totalAmount", label: "Total Amount", type: "number" },
    { name: "createdBy", label: "Created By", type: "text" },
    { name: "proposalId", label: "Proposal Id", type: "text" },
    { name: "invoiceId", label: "Invoice Id", type: "text" },
    { name: "method", label: "Payment Method", type: "text" },
    { name: "amount", label: "Amount", type: "number" },
    { name: "paymentDate", label: "Payment Date", type: "date" },
    { name: "category", label: "Category", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "relatedCustomerId", label: "Related Customer Id", type: "text" },

    // Custom fields for Customer Module
    { name: "taxId", label: "Tax ID", type: "text" },
    { name: "annualRevenue", label: "Annual Revenue", type: "number" },
    { name: "employeeCount", label: "Employee Count", type: "number" },
    { name: "customerSince", label: "Customer Since", type: "date" },
    { name: "lastContactDate", label: "Last Contact Date", type: "date" },
    { name: "nextFollowUp", label: "Next Follow Up", type: "date" },
  ];

  const fieldsToRender = customFields || allFields;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      setFormData({ ...formData, [name]: file });

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews((prev) => ({
            ...prev,
            [name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleShowPassword = (name) => {
    setShowPasswordFields((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderField = (field, idx) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "tel":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={
                field.placeholder || `Enter ${field.label.toLowerCase()}`
              }
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
              min={field.min}
              max={field.max}
              step={field.step}
            />
          </div>
        );

      case "password":
        return (
          <div key={idx} className="flex flex-col relative">
            <label className="text-sm text-gray-600 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={showPasswordFields[field.name] ? "text" : "password"}
              name={field.name}
              placeholder={
                field.placeholder || `Enter ${field.label.toLowerCase()}`
              }
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="border rounded-lg px-3 py-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
            />
            <span
              className="absolute right-3 top-8 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => toggleShowPassword(field.name)}
            >
              {showPasswordFields[field.name] ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>
        );

      case "textarea":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              name={field.name}
              placeholder={
                field.placeholder || `Enter ${field.label.toLowerCase()}`
              }
              value={formData[field.name] || ""}
              onChange={handleChange}
              rows={field.rows || 4}
              required={field.required}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan resize-vertical"
            />
          </div>
        );

      case "select":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt, oIdx) => (
                <option key={oIdx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "date":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="date"
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
            />
          </div>
        );

      case "checkbox":
        return (
          <div key={idx} className="flex items-center">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-cyan focus:ring-cyan border-gray-300 rounded"
            />
            <label className="text-sm text-gray-600">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );

      case "file":
      case "image":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="file"
              name={field.name}
              onChange={handleFileChange}
              accept={field.accept || "*/*"}
              required={field.required}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
            />
            {filePreviews[field.name] && (
              <div className="mt-2">
                <img
                  src={filePreviews[field.name]}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded border"
                />
              </div>
            )}
            {formData[field.name] &&
              typeof formData[field.name] === "string" && (
                <p className="text-xs text-gray-500 mt-1">
                  Current file: {formData[field.name]}
                </p>
              )}
          </div>
        );

      case "radio":
        return (
          <div key={idx} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex flex-wrap gap-4">
              {field.options?.map((opt, oIdx) => (
                <label key={oIdx} className="flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt.value}
                    checked={formData[field.name] === opt.value}
                    onChange={handleChange}
                    required={field.required}
                    className="mr-2 h-4 w-4 text-cyan focus:ring-cyan"
                  />
                  <span className="text-sm text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto">
      {title && (
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h2>
      )}
      {subtitle && ( // Now subtitle is properly defined
        <p className="text-gray-600 mb-6">{subtitle}</p>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fieldsToRender.map((field, idx) => renderField(field, idx))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-cyan text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
}
