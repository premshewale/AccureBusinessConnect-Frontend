import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
// import { useExpenses } from "../../../contexts/ExpenseContext.jsx";
import { useDispatch } from "react-redux";
import { adminCreateExpense } from "../../../services/expenses/adminCreateExpenseApi";

export default function CreateExpense() {
  const navigate = useNavigate();
  // const { addExpense } = useExpenses();
  const dispatch = useDispatch();

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (data) => {
    setFormLoading(true);

    try {
      const expenseData = {
        ...data,
        amount: Number(data.amount) || 0,
        category: data.category || "Other",
        status: data.status || "pending",
        paymentMethod: data.paymentMethod || "Cash",
        vendor: data.vendor || "Unknown",
      };

      // await addExpense(expenseData);
      await dispatch(adminCreateExpense(expenseData)).unwrap();

      alert("Expense created successfully!");
      navigate("/admin/expenses");
    } catch (error) {
      alert("Failed to create expense. Please try again.");
      console.error("Create expense error:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const fields = [
    {
      type: "text",
      label: "Title",
      name: "title",
      placeholder: "Enter expense title",
      required: true,
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      placeholder: "Describe the expense",
      rows: 3,
    },
    {
      type: "number",
      label: "Amount (₹)",
      name: "amount",
      placeholder: "Enter amount",
      required: true,
      min: 0,
    },
    {
      type: "select",
      label: "Category",
      name: "category",
      required: true,
      options: [
        { label: "Select Category", value: "" },
        { label: "Office", value: "Office" },
        { label: "Travel", value: "Travel" },
        { label: "Marketing", value: "Marketing" },
        { label: "Software", value: "Software" },
        { label: "Training", value: "Training" },
        { label: "Utilities", value: "Utilities" },
        { label: "Entertainment", value: "Entertainment" },
        { label: "Maintenance", value: "Maintenance" },
        { label: "Equipment", value: "Equipment" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      type: "date",
      label: "Date",
      name: "date",
      required: true,
      defaultValue: new Date().toISOString().split("T")[0],
    },
    {
      type: "text",
      label: "Vendor",
      name: "vendor",
      placeholder: "Enter vendor name",
    },
    {
      type: "select",
      label: "Payment Method",
      name: "paymentMethod",
      options: [
        { label: "Select Payment Method", value: "" },
        { label: "Cash", value: "Cash" },
        { label: "Credit Card", value: "Credit Card" },
        { label: "Debit Card", value: "Debit Card" },
        { label: "Bank Transfer", value: "Bank Transfer" },
        { label: "Cheque", value: "Cheque" },
        { label: "UPI", value: "UPI" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      type: "text",
      label: "Receipt Number",
      name: "receiptNumber",
      placeholder: "Enter receipt number",
    },
    {
      type: "select",
      label: "Status",
      name: "status",
      options: [
        { label: "Select Status", value: "" },
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      type: "file",
      label: "Receipt/Invoice",
      name: "receiptFile",
      accept: "image/*,.pdf,.doc,.docx",
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Expense</h1>
        <p className="text-gray-600">Add a new expense record</p>
      </div>

      <CommonForm
        title="Expense Information"
        subtitle="Fill in the details below to create a new expense"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Creating..." : "Create Expense"}
      />
    </div>
  );
}
