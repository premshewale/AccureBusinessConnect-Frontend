import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CommonDetails from "../../../components/common/CommonDetails";

import {
  getInvoiceById,
  updateInvoice,
} from "../../../services/invoices/invoiceApi";
import { resetInvoiceState } from "../../../slices/invoices/invoiceSlice";

export default function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

const { invoice, loading } = useSelector((state) => state.invoices);


  const [editedData, setEditedData] = useState({});

  // 🔹 Fetch invoice by ID
  useEffect(() => {
    dispatch(getInvoiceById(id));

    return () => {
      dispatch(resetInvoiceState());
    };
  }, [id, dispatch]);

  // 🔹 Sync API data to form
  useEffect(() => {
    if (invoice) {
      setEditedData(invoice);
    }
  }, [invoice]);

  // 🔹 Save updated invoice
  const handleSave = () => {
    dispatch(
      updateInvoice({
        id,
        payload: editedData,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/invoices");
      }
    });
  };

  if (loading) return <div className="p-4">Loading invoice details...</div>;
  if (!invoice) return <div className="p-4 text-red-500">Invoice not found</div>;

  return (
    <CommonDetails
      title="Invoice Details"
      data={editedData}
      fields={[
        { name: "id", label: "Invoice ID", readOnly: true },

        {
          name: "customerId",
          label: "Customer ID",
          readOnly: true,
        },
        {
          name: "departmentId",
          label: "Department ID",
          readOnly: true,
        },

        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            "DRAFT",
            "SENT",
            "PAID",
            "UNPAID",
            "OVERDUE",
            "CANCELLED",
          ],
        },

        {
          name: "issueDate",
          label: "Issue Date",
          type: "date",
        },
        {
          name: "dueDate",
          label: "Due Date",
          type: "date",
        },

        {
          name: "totalAmount",
          label: "Total Amount (₹)",
          readOnly: true,
        },
      ]}
      isEditMode={true}
      editedData={editedData}
      setEditedData={setEditedData}
      onSave={handleSave}
      loading={loading}
      onBack={() => navigate("/admin/invoices")}
    />
  );
}
