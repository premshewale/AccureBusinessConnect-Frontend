import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonForm from "../../../components/common/CommonForm.jsx";
import { adminCreatePaymentApi } from "../../../services/payment/adminCreatePaymentApi";

export default function CreatePayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const { role } = useSelector((state) => state.auth.user);
  const rolePath = role?.toLowerCase() || "admin";

  const handleSubmit = async (data) => {
    setFormLoading(true);

    try {
      const payload = {
        invoiceId: Number(data.invoiceId),
        amount: Number(data.amount),
        paymentDate: data.paymentDate,
        method: data.method,
      };

      await dispatch(adminCreatePaymentApi(payload)).unwrap();

      alert("Payment recorded successfully!");
      navigate(`/${rolePath}/payment`); // ✅ dynamic navigation
    } catch (error) {
      console.error("Create payment error:", error);
      alert("Failed to record payment. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const fields = [
    {
      type: "number",
      label: "Invoice ID",
      name: "invoiceId",
      placeholder: "Enter invoice ID",
      required: true,
      min: 1,
    },
    {
      type: "number",
      label: "Amount (₹)",
      name: "amount",
      placeholder: "Enter payment amount",
      required: true,
      min: 0,
    },
    {
      type: "date",
      label: "Payment Date",
      name: "paymentDate",
      required: true,
      defaultValue: new Date().toISOString().split("T")[0],
    },
    {
      type: "select",
      label: "Payment Method",
      name: "method",
      required: true,
      options: [
        { label: "Select Payment Method", value: "" },
        { label: "Cash", value: "CASH" },
        { label: "Bank Transfer", value: "BANK_TRANSFER" },
        { label: "Credit Card", value: "CREDIT_CARD" },
        { label: "UPI", value: "UPI" },
        { label: "Cheque", value: "CHEQUE" },
      ],
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Record New Payment</h1>
        <p className="text-gray-600">Add a payment against an invoice</p>
      </div>

      <CommonForm
        title="Payment Information"
        subtitle="Fill the details below to create a payment"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Recording..." : "Record Payment"}
      />
    </div>
  );
}
