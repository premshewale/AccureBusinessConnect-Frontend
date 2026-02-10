import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { createInvoice } from "../../../services/invoices/invoiceApi";
import { showError, showSuccess } from "../../../utils/toast";

export default function CreateInvoice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { role, user } = useSelector((state) => state.auth);
  const rolePath = role?.toLowerCase() || "admin";

  const [formLoading, setFormLoading] = useState(false);

  const [items, setItems] = useState([
    { id: Date.now(), description: "", quantity: 1, unitPrice: 0, amount: 0 },
  ]);

  // /* =========================
  //    ITEM HANDLERS
  // ========================= */
  // const addItem = () => {
  //   setItems([
  //     ...items,
  //     { id: Date.now(), description: "", quantity: 1, unitPrice: 0, amount: 0 },
  //   ]);
  // };

  // const removeItem = (id) => {
  //   if (items.length === 1) {
  //     showError("At least one item is required");
  //     return;
  //   }
  //   setItems(items.filter((item) => item.id !== id));
  // };

  // const updateItem = (id, field, value) => {
  //   setItems((prev) =>
  //     prev.map((item) => {
  //       if (item.id === id) {
  //         const updated = { ...item, [field]: value };
  //         if (field === "quantity" || field === "unitPrice") {
  //           updated.amount = Number(updated.quantity) * Number(updated.unitPrice);
  //         }
  //         return updated;
  //       }
  //       return item;
  //     })
  //   );
  // };

  /* =========================
     VALIDATION
  ========================= */
  const validateForm = (data) => {
    if (!data.customerId || Number(data.customerId) <= 0) {
      showError("Customer ID must be greater than 0");
      return false;
    }

    if (!data.departmentId || Number(data.departmentId) <= 0) {
      showError("Department ID must be greater than 0");
      return false;
    }

    if (!data.proposalId || Number(data.proposalId) <= 0) {
      showError("Proposal ID must be greater than 0");
      return false;
    }

    if (!data.issueDate) {
      showError("Issue date is required");
      return false;
    }

    if (!data.dueDate) {
      showError("Due date is required");
      return false;
    }

    if (new Date(data.dueDate) < new Date(data.issueDate)) {
      showError("Due date cannot be before issue date");
      return false;
    }

    

    return true;
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (formData) => {
    if (!validateForm(formData)) return;

    setFormLoading(true);

    try {
      const subtotal = items.reduce((sum, i) => sum + (i.amount || 0), 0);

      const taxRate = Number(formData.taxRate) || 0;
      const discount = Number(formData.discount) || 0;
      const amountPaid = Number(formData.amountPaid) || 0;

      const taxAmount = subtotal * (taxRate / 100);
      const totalAmount = Number((subtotal + taxAmount - discount).toFixed(2));
      const dueAmount = Number((totalAmount - amountPaid).toFixed(2));

      // if (dueAmount < 0) {
      //   showError("Amount paid cannot exceed total amount");
      //   setFormLoading(false);
      //   return;
      // }

      const payload = {
        customerId: Number(formData.customerId),
        departmentId: Number(formData.departmentId),
        proposalId: Number(formData.proposalId),
        issueDate: formData.issueDate,
        dueDate: formData.dueDate,
        status: formData.status || "DRAFT",
        totalAmount,
        amountPaid,
        dueAmount,
        taxRate,
        discount,
        items: items.filter(
          (i) => i.description.trim() && i.quantity > 0 && i.unitPrice > 0
        ),
        createdBy: user?.id,
        notes: formData.notes || "",
        terms: formData.terms || "",
      };

      await dispatch(createInvoice(payload)).unwrap();

      showSuccess("Invoice created successfully 🎉");
      navigate(`/${rolePath}/invoices`);
    } catch (err) {
      showError(
        err?.message || "Failed to create invoice. Please try again."
      );
    } finally {
      setFormLoading(false);
    }
  };

  /* =========================
     FORM FIELDS
  ========================= */
  const fields = [
    { type: "number", label: "Customer ID", name: "customerId", required: true },
    { type: "number", label: "Department ID", name: "departmentId", required: true },
    { type: "number", label: "Proposal ID", name: "proposalId", required: true },

    {
      type: "select",
      label: "Status",
      name: "status",
      required: true,
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Sent", value: "SENT" },
        { label: "Paid", value: "PAID" },
        { label: "Unpaid", value: "UNPAID" },
        { label: "Overdue", value: "OVERDUE" },
        { label: "Cancelled", value: "CANCELLED" },
      ],
    },

    {
      type: "date",
      label: "Issue Date",
      name: "issueDate",
      required: true,
      defaultValue: new Date().toISOString().split("T")[0],
    },
    {
      type: "date",
      label: "Due Date",
      name: "dueDate",
      required: true,
      defaultValue: new Date(Date.now() + 30 * 86400000)
        .toISOString()
        .split("T")[0],
    },

    { type: "number", label: "Tax Rate (%)", name: "taxRate", min: 0, max: 100 },
    { type: "number", label: "Discount (₹)", name: "discount", min: 0 },
    { type: "number", label: "Amount Paid (₹)", name: "amountPaid", min: 0 },
    { type: "textarea", label: "Notes", name: "notes", rows: 2 },
    {
      type: "textarea",
      label: "Terms & Conditions",
      name: "terms",
      rows: 2,
      defaultValue: "Payment due within 30 days.",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>

      <CommonForm
        title="Invoice Details"
        subtitle="Fill invoice information"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Creating..." : "Create Invoice"}
      />
    </div>
  );
}
