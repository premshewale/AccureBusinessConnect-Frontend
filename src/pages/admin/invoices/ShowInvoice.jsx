import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ShowDetails from "../../../components/common/ShowDetails";
import { getInvoiceById } from "../../../services/invoices/invoiceApi";
import { resetInvoiceState } from "../../../slices/invoices/invoiceSlice";

export default function ShowInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Use the correct slice state
  const { invoice, loading, error } = useSelector((state) => state.invoices);
  const { role } = useSelector((state) => state.auth);
  const rolePath = role?.toLowerCase() || "admin";

  // Fetch invoice by ID
  useEffect(() => {
    if (id) dispatch(getInvoiceById(id));
    return () => dispatch(resetInvoiceState());
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
        {typeof error === "string" ? error : "Failed to fetch invoice details"}
      </div>
    );
  }

  // No invoice found
  if (!invoice) {
    return (
      <div className="text-center text-gray-500 mt-6">
        Invoice not found
      </div>
    );
  }

  // Format invoice main fields
  const formattedInvoice = {
    ...invoice,
    totalAmount: invoice.totalAmount
      ? `₹ ${Number(invoice.totalAmount).toLocaleString("en-IN")}`
      : "-",
    issueDate: invoice.issueDate
      ? new Date(invoice.issueDate).toLocaleDateString("en-IN")
      : "-",
    dueDate: invoice.dueDate
      ? new Date(invoice.dueDate).toLocaleDateString("en-IN")
      : "-",
    createdAt: invoice.createdAt
      ? new Date(invoice.createdAt).toLocaleString("en-IN")
      : "-",
    status: invoice.status?.replace("_", " ") || "-",
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(`/${rolePath}/invoices`)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      {/* Main invoice details */}
      <ShowDetails title="Invoice Details" data={formattedInvoice} />

      {/* Payments section */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">Payments</h2>

        {invoice.payments && invoice.payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b">ID</th>
                  <th className="px-4 py-2 text-left border-b">Amount</th>
                  <th className="px-4 py-2 text-left border-b">Method</th>
                  <th className="px-4 py-2 text-left border-b">Payment Date</th>
                  <th className="px-4 py-2 text-left border-b">Status</th>
                  <th className="px-4 py-2 text-left border-b">Created At</th>
                </tr>
              </thead>
              <tbody>
                {invoice.payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{p.id}</td>
                    <td className="px-4 py-2 border-b">
                      ₹ {Number(p.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {p.method.replace("_", " ")}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {p.paymentDate
                        ? new Date(p.paymentDate).toLocaleDateString("en-IN")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {p.invoiceStatus?.replace("_", " ") || "-"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleString("en-IN")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No payments recorded yet.</p>
        )}
      </div>
    </div>
  );
}
