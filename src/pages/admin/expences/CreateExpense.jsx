import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { adminCreateExpense } from "../../../services/expenses/adminCreateExpenseApi";
import adminApi from "../../../store/adminApi"; // axios instance

export default function CreateExpense() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const rolePath = role?.toLowerCase() || "admin";

  const [formLoading, setFormLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  // 🔹 Fetch customers dynamically
useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const res = await adminApi.get("/customers");

      // handle different backend response shapes safely
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.content)
        ? res.data.content
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setCustomers(list);
    } catch (err) {
      console.error("Failed to load customers", err);
      setCustomers([]); // always keep it an array
    }
  };

  fetchCustomers();
}, []);


  const handleSubmit = async (data) => {
    setFormLoading(true);

    try {
      const expenseData = {
        category: data.category,                 // already uppercase from select
        amount: Number(data.amount),
        date: data.date,
        description: data.description || data.title || "",
        relatedCustomerId: Number(data.relatedCustomerId), // 🔥 dynamic
      };

      await dispatch(adminCreateExpense(expenseData)).unwrap();

      alert("Expense created successfully!");
      navigate(`/${rolePath}/expenses`);
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
      type: "text",
      label: "Category",
      name: "category",
      placeholder: "Enter Category here",
      required: true,
    },
    {
      type: "date",
      label: "Date",
      name: "date",
      required: true,
      defaultValue: new Date().toISOString().split("T")[0],
    },

    // 🔥 Dynamic customer dropdown (no static ID)
    {
      type: "select",
      label: "Customer",
      name: "relatedCustomerId",
      required: true,
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
