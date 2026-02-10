import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminGetCustomerById } from "../../../services/customers/adminGetCustomerByIdApi";
import { resetCustomerDetails } from "../../../slices/customers/adminGetCustomerByIdSlice";

import ShowDetails from "../../../components/common/ShowDetails";

export default function ShowCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customer, loading, error } = useSelector(
    (state) => state.adminGetCustomerById
  );

  const { role } = useSelector((state) => state.auth);
  const rolePath = role?.toLowerCase() || "admin";

  // Fetch customer
  useEffect(() => {
    if (id) dispatch(adminGetCustomerById(id));
    return () => dispatch(resetCustomerDetails());
  }, [dispatch, id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-t-2 border-cyan rounded-full"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-500 mt-6">
        {typeof error === "string" ? error : "Failed to fetch customer details"}
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center text-gray-500 mt-6">
        Customer not found
      </div>
    );
  }

  // Format some fields for display
  const formattedCustomer = {
    ...customer,
    createdAt: customer.createdAt
      ? new Date(customer.createdAt).toLocaleString("en-IN")
      : "-",
    updatedAt: customer.updatedAt
      ? new Date(customer.updatedAt).toLocaleString("en-IN")
      : "-",
    totalContacts: customer.totalContacts ?? 0,
    assignedUserName: customer.assignedUserName || "-",
    departmentName: customer.departmentName || "-",
    website: customer.website || "-",
    address: customer.address || "-",
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(`/${rolePath}/customers`)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <ShowDetails
        title="Customer Details"
        data={formattedCustomer}
      />
    </div>
  );
}
