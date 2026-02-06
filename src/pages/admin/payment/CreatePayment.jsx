import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonForm from "../../../components/common/CommonForm.jsx";
import { adminCreatePaymentApi } from "../../../services/payment/adminCreatePaymentApi";
import { showError, showSuccess } from "../../../utils/toast";

export default function CreatePayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);

  // ✅ logged-in user role
  const { role } = useSelector((state) => state.auth.user || {});
  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  // ✅ validation
  const validateForm = (data) => {
    if (!data.invoiceId || Number(data.invoiceId) <= 0) {
      showError("Invoice ID must be greater than 0");
      return false;
    }

    if (!data.amount || Number(data.amount) <= 0) {
      showError("Amount must be greater than 0");
      return false;
    }

    if (!data.paymentDate) {
      showError("Payment date is required");
      return false;
    }

    if (!data.method) {
      showError("Please select a payment method");
      return false;
    }

    return true;
  };

  const handleSubmit = async (data) => {
    if (!validateForm(data)) return;

    setFormLoading(true);

    try {
      const payload = {
        invoiceId: Number(data.invoiceId),
        amount: Number(data.amount),
        paymentDate: data.paymentDate,
        method: data.method,
      };

      await dispatch(adminCreatePaymentApi(payload)).unwrap();

      showSuccess("Payment recorded successfully");
      navigate(`/${rolePath}/payment`);
    } catch (error) {
      console.error("Create payment error:", error);

      showError(
        typeof error === "string"
          ? error
          : error?.message || "Failed to record payment"
      );
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
      min: 1,
    },
    {
      type: "number",
      label: "Amount (₹)",
      name: "amount",
      placeholder: "Enter payment amount",
      min: 1,
    },
    {
      type: "date",
      label: "Payment Date",
      name: "paymentDate",
      defaultValue: new Date().toISOString().split("T")[0],
    },
    {
      type: "select",
      label: "Payment Method",
      name: "method",
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
        <h1 className="text-2xl font-bold text-gray-800">
          Record New Payment
        </h1>
        <p className="text-gray-600">
          Add a payment against an invoice
        </p>
      </div>

      <CommonForm
        title="Payment Information"
        subtitle="Fill the details below to create a payment"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Recording..." : "Record Payment"}
        disabled={formLoading}
      />
    </div>
  );
}
