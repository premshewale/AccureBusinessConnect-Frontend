import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonDetails from "../../../components/common/CommonDetails.jsx";

import { adminGetPaymentById } from "../../../services/payment/adminGetPaymentByIdApi";
import { resetPaymentDetails } from "../../../slices/payment/adminGetPaymentByIdSlice";

export default function PaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, payment, error } = useSelector(
    (state) => state.adminGetPaymentById,
  );
  const { role } = useSelector((state) => state.auth.user);
  const rolePath = role?.toLowerCase() || "admin"; // fallback to "admin"
  /* =======================
     FETCH PAYMENT
  ======================= */
  useEffect(() => {
    if (id) {
      dispatch(adminGetPaymentById(id));
    }

    return () => {
      dispatch(resetPaymentDetails());
    };
  }, [dispatch, id]);

  /* =======================
     SAFETY: NO ID
  ======================= */
  if (!id) {
    return <p className="mt-6 text-red-500 text-center">Invalid payment ID</p>;
  }

  if (loading) {
    return (
      <p className="mt-6 text-gray-500 text-center">
        Loading payment details...
      </p>
    );
  }

  if (error) {
    return <p className="mt-6 text-red-500 text-center">{error}</p>;
  }

  if (!payment) return null;

  /* =======================
     FIELD DEFINITIONS
  ======================= */
  const paymentFields = [
    { name: "id", label: "Payment ID" },
    {
      name: "amount",
      label: "Amount",
      format: (val) =>
        val != null ? `₹${Number(val).toLocaleString("en-IN")}` : "N/A",
    },
    {
      name: "paymentDate",
      label: "Payment Date",
      format: (val) =>
        val ? new Date(val).toLocaleDateString("en-IN") : "N/A",
    },
    { name: "method", label: "Payment Method" },
    { name: "invoiceStatus", label: "Invoice Status" },
    { name: "invoiceId", label: "Invoice ID" },
    {
      name: "createdAt",
      label: "Created At",
      format: (val) => (val ? new Date(val).toLocaleString("en-IN") : "N/A"),
    },
  ];

  /* =======================
     FORMAT DISPLAY DATA
  ======================= */
  const formattedPayment = { ...payment };

  paymentFields.forEach((field) => {
    if (field.format && formattedPayment[field.name] != null) {
      formattedPayment[field.name] = field.format(formattedPayment[field.name]);
    }
  });

  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        onClick={() => navigate(`/${rolePath}/payment`)}
      >
        ← Back
      </button>

      <CommonDetails
        title="Payment Details"
        data={formattedPayment}
        fields={paymentFields}
        isEditMode={false}
        editedData={formattedPayment}
        setEditedData={() => {}}
      />
    </div>
  );
}
