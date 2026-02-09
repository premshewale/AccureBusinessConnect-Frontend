import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ShowDetails from "../../../components/common/ShowDetails.jsx";
import { adminGetExpenseById } from "../../../services/expenses/adminGetExpenseByIdApi.js";
import { resetAdminGetExpenseById } from "../../../slices/expenses/adminGetExpenseByIdSlice.js";

export default function ShowExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { expense, loading, error } = useSelector(
    (state) => state.adminGetExpenseById
  );
  const { role } = useSelector((state) => state.auth);
  const rolePath = role?.toLowerCase() || "admin";

  // Fetch expense by ID
  useEffect(() => {
    if (id) dispatch(adminGetExpenseById(id));
    return () => dispatch(resetAdminGetExpenseById());
  }, [dispatch, id]);

  // Loading, error, not found states
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-t-2 border-cyan rounded-full"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-6">
        {typeof error === "string" ? error : "Failed to fetch expense details"}
      </div>
    );

  if (!expense)
    return (
      <div className="text-center text-gray-500 mt-6">Expense not found</div>
    );

  // Format expense fields for display
  const formattedExpense = {
    ...expense,
    amount: expense.amount
      ? `₹ ${Number(expense.amount).toLocaleString("en-IN")}`
      : "-",
    date: expense.date ? new Date(expense.date).toLocaleDateString("en-IN") : "-",
    createdAt: expense.createdAt
      ? new Date(expense.createdAt).toLocaleString("en-IN")
      : "-",
    updatedAt: expense.updatedAt
      ? new Date(expense.updatedAt).toLocaleString("en-IN")
      : "-",
    status: expense.status?.replace("_", " ") || "-",
  };

  // Fields to show in ShowDetails component
  const expenseFields = [
    { name: "id", label: "Expense ID" },
    { name: "category", label: "Category" },
    { name: "amount", label: "Amount" },
    { name: "date", label: "Date" },
    { name: "description", label: "Description" },
    { name: "relatedCustomerName", label: "Customer" },
    { name: "departmentName", label: "Department" },
    { name: "ownerName", label: "Owner" },
    { name: "status", label: "Status" },
    { name: "createdAt", label: "Created At" },
    { name: "updatedAt", label: "Updated At" },
  ];

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(`/${rolePath}/expenses`)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      {/* Show Expense Details */}
      <ShowDetails title="Expense Details" data={formattedExpense} fields={expenseFields} />
    </div>
  );
}
