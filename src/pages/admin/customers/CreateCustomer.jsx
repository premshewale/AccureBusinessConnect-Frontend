import React from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";

export default function CreateCustomer() {
  const navigate = useNavigate();
  
  const handleSubmit = (data) => {
    console.log("Customer data submitted:", data);
    alert(`Customer created successfully!\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'N/A'}`);
    navigate("/admin/customers");
  };
  
  // Define only the fields we need for customer creation
  const customerFields = [
    // Basic Information
    { 
      type: "text", 
      label: "Full Name", 
      name: "name", 
      required: true,
      placeholder: "Enter customer's full name" 
    },
    { 
      type: "email", 
      label: "Email Address", 
      name: "email", 
      required: true,
      placeholder: "customer@example.com" 
    },
    { 
      type: "tel", 
      label: "Phone Number", 
      name: "phone", 
      required: true,
      placeholder: "+91 98765 43210" 
    },
    { 
      type: "text", 
      label: "Mobile Number", 
      name: "mobile",
      placeholder: "+91 98765 43210" 
    },
    
    // Company Information
    { 
      type: "text", 
      label: "Company Name", 
      name: "company",
      placeholder: "Enter company name" 
    },
    { 
      type: "text", 
      label: "Company Website", 
      name: "companyWebsite",
      placeholder: "https://example.com" 
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
    
    // Customer Details
    { 
      type: "select",
      label: "Customer Type",
      name: "customerType",
      options: [
        { label: "Select Type", value: "" },
        { label: "Individual", value: "individual" },
        { label: "Business", value: "business" },
        { label: "Enterprise", value: "enterprise" },
      ]
    },
    { 
      type: "select",
      label: "Status",
      name: "status",
      options: [
        { label: "Select Status", value: "" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Prospect", value: "prospect" },
        { label: "Lead", value: "lead" },
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
        { label: "Social Media", value: "social_media" },
        { label: "Email Campaign", value: "email" },
        { label: "Cold Call", value: "cold_call" },
        { label: "Event", value: "event" },
        { label: "Other", value: "other" },
      ]
    },
    
    // Address Information
    { 
      type: "textarea", 
      label: "Address", 
      name: "address",
      rows: 2,
      placeholder: "Enter complete address" 
    },
    { 
      type: "text", 
      label: "City", 
      name: "city",
      placeholder: "Enter city" 
    },
    { 
      type: "text", 
      label: "State", 
      name: "state",
      placeholder: "Enter state" 
    },
    { 
      type: "text", 
      label: "Country", 
      name: "country",
      placeholder: "Enter country",
      value: "India"
    },
    { 
      type: "text", 
      label: "Zip Code", 
      name: "zipCode",
      placeholder: "Enter zip code" 
    },
    
    // Financial Information
    { 
      type: "number", 
      label: "Annual Revenue", 
      name: "annualRevenue",
      placeholder: "Enter annual revenue in ₹" 
    },
    { 
      type: "number", 
      label: "Employee Count", 
      name: "employeeCount",
      placeholder: "Enter number of employees" 
    },
    { 
      type: "text", 
      label: "Tax ID", 
      name: "taxId",
      placeholder: "Enter tax identification number" 
    },
    
    // Contact Person Details
    { 
      type: "text", 
      label: "Contact Person Name", 
      name: "contactPerson",
      placeholder: "Enter contact person's name" 
    },
    { 
      type: "text", 
      label: "Job Title", 
      name: "jobTitle",
      placeholder: "Enter job title" 
    },
    
    // Dates
    { 
      type: "date", 
      label: "Customer Since", 
      name: "customerSince" 
    },
    { 
      type: "date", 
      label: "Next Follow Up", 
      name: "nextFollowUp" 
    },
    
    // Additional Information
    { 
      type: "textarea", 
      label: "Notes", 
      name: "notes",
      rows: 3,
      placeholder: "Add any additional notes about this customer" 
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Create New Customer</h1>
        <p className="text-gray-600">Add a new customer to your CRM system</p>
      </div>
      
      <CommonForm
        title="Customer Details"
        fields={customerFields}
        onSubmit={handleSubmit}
        submitText="Create Customer"
      />
    </div>
  );
}