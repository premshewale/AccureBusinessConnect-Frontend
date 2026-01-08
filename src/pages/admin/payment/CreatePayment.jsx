import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { usePayments } from "../../../contexts/PaymentContext.jsx";
import { useCustomers } from "../../../contexts/CustomerContext.jsx";

export default function CreatePayment() {
  const navigate = useNavigate();
  const { addPayment } = usePayments();
  const { customers } = useCustomers();
  const [formLoading, setFormLoading] = useState(false);
  
  const handleSubmit = async (data) => {
    setFormLoading(true);
    
    try {
      const paymentData = {
        ...data,
        customerId: Number(data.customerId),
        amount: Number(data.amount) || 0,
        amountPaid: Number(data.amountPaid) || 0,
        paymentType: data.paymentType || "full",
        status: data.status || "pending",
      };
      
      await addPayment(paymentData);
      
      alert("Payment recorded successfully!");
      navigate("/admin/payment");
    } catch (error) {
      alert("Failed to record payment. Please try again.");
      console.error("Create payment error:", error);
    } finally {
      setFormLoading(false);
    }
  };
  
  const fields = [
    {
      type: "select",
      label: "Customer",
      name: "customerId",
      required: true,
      options: [
        { label: "Select Customer", value: "" },
        ...customers.map(customer => ({
          label: `${customer.name}${customer.company ? ` (${customer.company})` : ''}`,
          value: customer.id.toString()
        }))
      ]
    },
    { 
      type: "text", 
      label: "Invoice Number", 
      name: "invoiceNumber", 
      placeholder: "Enter invoice number",
      required: true
    },
    { 
      type: "number", 
      label: "Total Amount (₹)", 
      name: "amount", 
      placeholder: "Enter total amount",
      required: true,
      min: 0
    },
    { 
      type: "number", 
      label: "Amount Paid (₹)", 
      name: "amountPaid", 
      placeholder: "Enter amount paid",
      required: true,
      min: 0
    },
    { 
      type: "date", 
      label: "Payment Date", 
      name: "paymentDate", 
      required: true,
      defaultValue: new Date().toISOString().split('T')[0]
    },
    {
      type: "select",
      label: "Payment Method",
      name: "paymentMethod",
      required: true,
      options: [
        { label: "Select Payment Method", value: "" },
        { label: "Bank Transfer", value: "Bank Transfer" },
        { label: "Credit Card", value: "Credit Card" },
        { label: "UPI", value: "UPI" },
        { label: "Cash", value: "Cash" },
        { label: "Cheque", value: "Cheque" },
        { label: "Other", value: "Other" },
      ]
    },
    {
      type: "select",
      label: "Payment Type",
      name: "paymentType",
      options: [
        { label: "Select Payment Type", value: "" },
        { label: "Full Payment", value: "full" },
        { label: "Installment", value: "installment" },
        { label: "Advance Payment", value: "advance" },
        { label: "Final Payment", value: "final" },
      ]
    },
    { 
      type: "text", 
      label: "Transaction ID", 
      name: "transactionId", 
      placeholder: "Enter transaction/reference ID" 
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
        <h1 className="text-2xl font-bold text-gray-800">Record New Payment</h1>
        <p className="text-gray-600">Record a customer payment</p>
      </div>
      
      <CommonForm
        title="Payment Information"
        subtitle="Fill in the details below to record a new payment"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Recording..." : "Record Payment"}
      />
    </div>
  );
}