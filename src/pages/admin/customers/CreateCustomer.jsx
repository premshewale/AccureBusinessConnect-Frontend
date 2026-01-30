import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { useCustomers } from "../../../contexts/CustomerContext";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateCustomer } from "../../../services/customers/adminCreateCustomerApi";
import { showError, showSuccess } from "../../../utils/toast"; 

export default function CreateCustomer() {
  const navigate = useNavigate();
  const { addCustomer } = useCustomers();
  const [formLoading, setFormLoading] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.adminCreateCustomer);
  const role = useSelector((state) => state.auth.role);
  const rolePath = role?.toLowerCase().replace("_", "-") || "admin";

  // ✅ VALIDATION ADDED (no existing logic touched)
  const validateForm = (data) => {
    if (!data.name || data.name.trim().length < 3) {
      showError("Customer name must be at least 3 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      showError("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
      showError("Phone number must be 10 digits");
      return false;
    }

    if (!data.industry) {
      showError("Please select an industry");
      return false;
    }

    if (!data.address || data.address.trim().length < 5) {
      showError("Address must be at least 5 characters");
      return false;
    }

    return true;
  };

  // 🔹 ONLY UPDATED INTERNALLY
  const handleSubmit = async (data) => {
    if (!validateForm(data)) return;

    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        industry: data.industry,
        type: "REGULAR",
        status: data.status?.toUpperCase() || "ACTIVE",
        address: data.address,
      };

      await dispatch(adminCreateCustomer(payload)).unwrap();
      showSuccess("Customer created successfully!");
      navigate(`/${rolePath}/customers`);
    } catch (err) {
      showError("Failed to create customer"); // ✅ replaced alert
      console.error(err);
    }
  };

  const fields = [
    {
      type: "text",
      label: "Name",
      name: "name",
      placeholder: "Enter customer name",
      required: true,
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      placeholder: "Enter email",
      required: true,
    },
    {
      type: "text",
      label: "Phone",
      name: "phone",
      placeholder: "Enter phone number",
      required: true,
    },
    {
      type: "text",
      label: "Company",
      name: "company",
      placeholder: "Enter company name",
    },
    {
      type: "text",
      label: "Industry",
      name: "industry",
      placeholder: "Enter Industry name",
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      options: [
        { label: "Select Status", value: "" },
        { label: "Active", value: "ACTIVE" },
        { label: "Inactive", value: "INACTIVE" },
        { label: "Prospect", value: "PROSPECT" },
        { label: "Blocked", value: "BLOCKED" },
      ],
    },
    {
      type: "number",
      label: "Total Value (₹)",
      name: "totalValue",
      placeholder: "Enter total value",
      min: 0,
    },
    {
      type: "textarea",
      label: "Address",
      name: "address",
      placeholder: "Enter address",
      rows: 3,
    },
    {
      type: "textarea",
      label: "Notes",
      name: "notes",
      placeholder: "Additional notes",
      rows: 3,
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Create New Customer
        </h1>
        <p className="text-gray-600">Add a new customer to your CRM</p>
      </div>

      <CommonForm
        title="Customer Information"
        subtitle="Fill in the details below to create a new customer"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Creating..." : "Create Customer"}
      />
    </div>
  );
}
