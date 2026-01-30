import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { createInvoice } from "../../../services/invoices/invoiceApi";

export default function CreateInvoice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user); // for createdBy
  const rolePath = role?.toLowerCase() || "admin";

  const [formLoading, setFormLoading] = useState(false);

  const [items, setItems] = useState([
    { id: Date.now(), description: "", quantity: 1, unitPrice: 0, amount: 0 },
  ]);

  // =========================
  // ITEM HANDLERS
  // =========================
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), description: "", quantity: 1, unitPrice: 0, amount: 0 },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updated.amount = updated.quantity * updated.unitPrice;
          }
          return updated;
        }
        return item;
      })
    );
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      const subtotal = items.reduce((sum, i) => sum + (i.amount || 0), 0);

      const taxRate = Number(formData.taxRate) || 0;
      const discount = Number(formData.discount) || 0;
      const amountPaid = Number(formData.amountPaid) || 0;

      const taxAmount = subtotal * (taxRate / 100);
      const total = subtotal + taxAmount - discount;

      // make DECIMAL(12,2)
      const totalAmount = Number(total.toFixed(2));
      const dueAmount = Number((totalAmount - amountPaid).toFixed(2));

      const payload = {
        customerId: Number(formData.customerId),
        departmentId: Number(formData.departmentId),
        proposalId: Number(formData.proposalId),
        issueDate: formData.issueDate,
        dueDate: formData.dueDate,
        status: formData.status || "DRAFT", // must match ENUM
        totalAmount, // DECIMAL(12,2)
        amountPaid,
        dueAmount,
        taxRate,
        discount,
        items: items.filter((i) => i.description && i.quantity > 0),
        createdBy: user?.id, // dynamic logged-in user
        notes: formData.notes || "",
        terms: formData.terms || "",
      };

      await dispatch(createInvoice(payload)).unwrap();

      alert("Invoice created successfully!");
      navigate(`/${rolePath}/invoices`);
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice");
    } finally {
      setFormLoading(false);
    }
  };

  // =========================
  // FORM FIELDS (DYNAMIC)
  // =========================
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

  // =========================
  // TOTALS FOR UI
  // =========================
  const subtotal = items.reduce((sum, i) => sum + (i.amount || 0), 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>

      {/* ITEMS TABLE */}
      {/* <div className="bg-white border rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-3">Invoice Items</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td>
                  <input
                    className="w-full border p-1"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="w-20 border p-1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, "quantity", Number(e.target.value))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="w-28 border p-1"
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(item.id, "unitPrice", Number(e.target.value))
                    }
                  />
                </td>
                <td>₹{item.amount.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addItem} className="mt-3 px-3 py-1 border rounded">
          + Add Item
        </button>

        <div className="text-right font-bold mt-3">
          Subtotal: ₹{subtotal.toFixed(2)}
        </div>
      </div> */}

      {/* MAIN FORM */}
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
