import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CommonForm from "../../../components/common/CommonForm.jsx";
import { adminCreateExpense } from "../../../services/expenses/adminCreateExpenseApi";
import adminApi from "../../../store/adminApi";
import { showError, showSuccess } from "../../../utils/toast";

export default function CreateExpense() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ logged-in role
  const role = useSelector((state) => state.auth.role);
  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  const [formLoading, setFormLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  // 🔹 Fetch customers dynamically
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await adminApi.get("/customers");

        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.content)
          ? res.data.content
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setCustomers(list);
      } catch (err) {
        console.error("Failed to load customers", err);
        showError("Failed to load customers");
        setCustomers([]);
      }
    };

    fetchCustomers();
  }, []);

  // ✅ validations
  const validateForm = (data) => {
    if (!data.title || data.title.trim().length < 3) {
      showError("Title must be at least 3 characters");
      return false;
    }

    if (!data.amount || Number(data.amount) <= 0) {
      showError("Amount must be greater than 0");
      return false;
    }

    if (!data.category) {
      showError("Please select an expense category");
      return false;
    }

    if (!data.date) {
      showError("Expense date is required");
      return false;
    }

    if (!data.relatedCustomerId) {
      showError("Please select a customer");
      return false;
    }

    return true;
  };

  const handleSubmit = async (data) => {
    if (!validateForm(data)) return;

    setFormLoading(true);

    try {
      const expenseData = {
        category: data.category, // ENUM-safe
        amount: Number(data.amount),
        date: data.date,
        description: data.description || data.title || "",
        relatedCustomerId: Number(data.relatedCustomerId),
      };

      await dispatch(adminCreateExpense(expenseData)).unwrap();

      showSuccess("Expense created successfully");
      navigate(`/${rolePath}/expenses`);
    } catch (error) {
      console.error("Create expense error:", error);
      showError(
        typeof error === "string"
          ? error
          : error?.message || "Failed to create expense"
      );
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
      min: 1,
    },
    {
      type: "select",
      label: "Category",
      name: "category",
      options: [
        { label: "Select Category", value: "" },
        { label: "Travel", value: "TRAVEL" },
        { label: "Marketing", value: "MARKETING" },
        { label: "Software", value: "SOFTWARE" },
        { label: "Salary", value: "SALARY" },
        { label: "Other", value: "OTHER" },
      ],
    },
    {
      type: "date",
      label: "Date",
      name: "date",
      defaultValue: new Date().toISOString().split("T")[0],
    },
    {
      type: "select",
      label: "Customer",
      name: "relatedCustomerId",
      options: [
        { label: "Select Customer", value: "" },
        ...customers.map((c) => ({
          label: c.name,
          value: c.id,
        })),
      ],
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Create New Expense
        </h1>
        <p className="text-gray-600">
          Add a new expense record
        </p>
      </div>

      <CommonForm
        title="Expense Information"
        subtitle="Fill in the details below to create a new expense"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Creating..." : "Create Expense"}
        disabled={formLoading}
      />
    </div>
  );
}
