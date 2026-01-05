import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonDetails from "../../../components/common/CommonDetails.jsx";

import {
  CUSTOMER_STATUS_OPTIONS,
  CUSTOMER_INDUSTRY_OPTIONS,
} from "../../../constants/customerEnums.js";

import { adminGetCustomerById } from "../../../services/customers/adminGetCustomerByIdApi";
import { resetCustomerDetails } from "../../../slices/customers/adminGetCustomerByIdSlice";
import { adminUpdateCustomer } from "../../../services/customers/adminUpdateCustomerApi";

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, customer, error } = useSelector(
    (state) => state.adminGetCustomerById
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  /* =======================
     FETCH CUSTOMER
  ======================= */
  useEffect(() => {
    dispatch(adminGetCustomerById(id));

    return () => {
      dispatch(resetCustomerDetails());
    };
  }, [dispatch, id]);

  // Populate local editedData whenever customer loads or updates
  useEffect(() => {
    if (customer) {
      setEditedData({
        id: customer.id || "",
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        industry: customer.industry || "",
        status: customer.status || "",
        type: customer.type || "",
        website: customer.website || "",
        contactPersonCount: customer.contactPersonCount || "",
        totalContacts: customer.totalContacts || "",
        tags: customer.tags || "",
        departmentName: customer.departmentName || "",
        assignedUserName: customer.assignedUserName || "",
        createdAt: customer.createdAt || "",
        updatedAt: customer.updatedAt || "",
      });
    }
  }, [customer]);

  if (loading)
    return (
      <p className="mt-6 text-gray-500 text-center">
        Loading customer details...
      </p>
    );

  if (error)
    return <p className="mt-6 text-red-500 text-center">{error}</p>;

  if (!customer) return null;

  /* =======================
     FIELD DEFINITIONS
  ======================= */
  const customerFields = [
    { name: "id", label: "Customer ID", readOnly: true },
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "address", label: "Address" },
    {
      name: "industry",
      label: "Industry",
      type: "select",
      options: CUSTOMER_INDUSTRY_OPTIONS,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: CUSTOMER_STATUS_OPTIONS,
    },
    { name: "type", label: "Customer Type", readOnly: true },
    { name: "website", label: "Website" },
    {
      name: "contactPersonCount",
      label: "Contact Persons",
      type: "number",
    },
    {
      name: "totalContacts",
      label: "Total Contacts",
      readOnly: true,
    },
    {
      name: "tags",
      label: "Tags",
      placeholder: "Comma separated",
      format: (val) => (Array.isArray(val) ? val.join(", ") : val || ""),
    },
    { name: "departmentName", label: "Department", readOnly: true },
    { name: "assignedUserName", label: "Assigned To", readOnly: true },
    {
      name: "createdAt",
      label: "Created At",
      readOnly: true,
      format: (val) =>
        val ? new Date(val).toLocaleString("en-IN") : "N/A",
    },
    {
      name: "updatedAt",
      label: "Last Updated",
      readOnly: true,
      format: (val) =>
        val ? new Date(val).toLocaleString("en-IN") : "N/A",
    },
  ];

  /* =======================
     FORMAT DISPLAY DATA
  ======================= */
  const formattedCustomer = { ...editedData };

  customerFields.forEach((field) => {
    if (field.format && formattedCustomer[field.name]) {
      formattedCustomer[field.name] = field.format(
        formattedCustomer[field.name]
      );
    }
  });

  /* =======================
     HANDLERS
  ======================= */
  const handleEdit = () => setIsEditMode(true);
  const handleCancelEdit = () => setIsEditMode(false);

  const handleSave = async () => {
    try {
      await dispatch(
        adminUpdateCustomer({
          id,
          payload: editedData,
        })
      ).unwrap();

      dispatch(adminGetCustomerById(id)); // refresh latest
      alert("Customer updated successfully");
      setIsEditMode(false);
    } catch (err) {
      alert(err?.message || "Failed to update customer");
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <CommonDetails
        title="Customer Details"
        data={formattedCustomer}
        fields={customerFields}
        isEditMode={isEditMode}
        editedData={editedData}
        setEditedData={setEditedData}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
    </div>
  );
}
