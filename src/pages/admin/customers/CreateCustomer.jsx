/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { useCustomers } from "../../../contexts/CustomerContext"; // Import context

export default function CreateCustomer() {
  const navigate = useNavigate();
  const { addCustomer } = useCustomers(); // Get addCustomer function from context
  const [formLoading, setFormLoading] = useState(false);
  
  const handleSubmit = async (data) => {
    setFormLoading(true);
    
    try {
      const customerData = {
        ...data,
        totalValue: data.totalValue || 0,
        status: data.status || "new",
        source: data.source || "website",
        lastContact: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      await addCustomer(customerData);
      
      alert("Customer created successfully!");
      navigate("/admin/customers");
    } catch (error) {
      alert("Failed to create customer. Please try again.");
      console.error("Create customer error:", error);
    } finally {
      setFormLoading(false);
    }
  };
  
  // Fields for customer creation
  const fields = [
    { 
      type: "text", 
      label: "Name", 
      name: "name", 
      placeholder: "Enter customer name",
      required: true
    },
    { 
      type: "email", 
      label: "Email", 
      name: "email", 
      placeholder: "Enter email",
      required: true
    },
    { 
      type: "text", 
      label: "Phone", 
      name: "phone", 
      placeholder: "Enter phone number",
      required: true
    },
    { 
      type: "text", 
      label: "Company", 
      name: "company", 
      placeholder: "Enter company name" 
    },
    { 
      type: "select",
      label: "Industry",
      name: "industry",
      options: [
        { label: "Select Industry", value: "" },
        { label: "Technology", value: "Technology" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Finance", value: "Finance" },
        { label: "Retail", value: "Retail" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Education", value: "Education" },
        { label: "Real Estate", value: "Real Estate" },
        { label: "Hospitality", value: "Hospitality" },
        { label: "Other", value: "Other" },
      ]
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      options: [
        { label: "Select Status", value: "" },
        { label: "New", value: "new" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Prospect", value: "prospect" },
      ]
    },
    {
      type: "select",
      label: "Source",
      name: "source",
      options: [
        { label: "Select Source", value: "" },
        { label: "Website", value: "website" },
        { label: "Referral", value: "referral" },
        { label: "Email", value: "email" },
        { label: "Social Media", value: "social_media" },
        { label: "Cold Call", value: "cold_call" },
        { label: "Event", value: "event" },
      ]
    },
    { 
      type: "number", 
      label: "Total Value", 
      name: "totalValue", 
      placeholder: "Enter total value in ₹" 
    },
    { 
      type: "textarea", 
      label: "Address", 
      name: "address", 
      placeholder: "Enter address" 
    },
    { 
      type: "textarea", 
      label: "Notes", 
      name: "notes", 
      placeholder: "Additional notes" 
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Customer</h1>
        <p className="text-gray-600">Add a new customer to your CRM</p>
      </div>
      
      <CommonForm
        title="Customer Information"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Creating..." : "Create Customer"}
      />
    </div>
  );
}

*/




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { useCustomers } from "../../../contexts/CustomerContext";

export default function CreateCustomer() {
  const navigate = useNavigate();
  const { addCustomer } = useCustomers();
  const [formLoading, setFormLoading] = useState(false);
  
  const handleSubmit = async (data) => {
    setFormLoading(true);
    
    try {
      const customerData = {
        ...data,
        totalValue: Number(data.totalValue) || 0,
        status: data.status || "new",
        source: data.source || "website",
        lastContact: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      await addCustomer(customerData);
      
      alert("Customer created successfully!");
      navigate("/admin/customers");
    } catch (error) {
      alert("Failed to create customer. Please try again.");
      console.error("Create customer error:", error);
    } finally {
      setFormLoading(false);
    }
  };
  
  // Fields for customer creation - using CommonForm format
  const fields = [
    { 
      type: "text", 
      label: "Name", 
      name: "name", 
      placeholder: "Enter customer name",
      required: true
    },
    { 
      type: "email", 
      label: "Email", 
      name: "email", 
      placeholder: "Enter email",
      required: true
    },
    { 
      type: "text", 
      label: "Phone", 
      name: "phone", 
      placeholder: "Enter phone number",
      required: true
    },
    { 
      type: "text", 
      label: "Company", 
      name: "company", 
      placeholder: "Enter company name" 
    },
    { 
      type: "select",
      label: "Industry",
      name: "industry",
      options: [
        { label: "Select Industry", value: "" },
        { label: "Technology", value: "Technology" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Finance", value: "Finance" },
        { label: "Retail", value: "Retail" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Education", value: "Education" },
        { label: "Real Estate", value: "Real Estate" },
        { label: "Hospitality", value: "Hospitality" },
        { label: "Other", value: "Other" },
      ]
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      options: [
        { label: "Select Status", value: "" },
        { label: "New", value: "new" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Prospect", value: "prospect" },
      ]
    },
    {
      type: "select",
      label: "Source",
      name: "source",
      options: [
        { label: "Select Source", value: "" },
        { label: "Website", value: "website" },
        { label: "Referral", value: "referral" },
        { label: "Email", value: "email" },
        { label: "Social Media", value: "social_media" },
        { label: "Cold Call", value: "cold_call" },
        { label: "Event", value: "event" },
      ]
    },
    { 
      type: "number", 
      label: "Total Value (₹)", 
      name: "totalValue", 
      placeholder: "Enter total value",
      min: 0
    },
    { 
      type: "textarea", 
      label: "Address", 
      name: "address", 
      placeholder: "Enter address",
      rows: 3
    },
    { 
      type: "textarea", 
      label: "Notes", 
      name: "notes", 
      placeholder: "Additional notes",
      rows: 3
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Customer</h1>
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