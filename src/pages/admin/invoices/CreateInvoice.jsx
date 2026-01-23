import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { useInvoices } from "../../../contexts/InvoiceContext.jsx";

export default function CreateInvoice() {
  const navigate = useNavigate();
  const { addInvoice } = useInvoices();
  const [formLoading, setFormLoading] = useState(false);
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, unitPrice: 0, amount: 0 }
  ]);
  
  const handleSubmit = async (formData) => {
    setFormLoading(true);
    
    try {
      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
      const taxAmount = subtotal * ((formData.taxRate || 0) / 100);
      const totalAmount = subtotal + taxAmount - (formData.discount || 0);
      const dueAmount = totalAmount - (formData.amountPaid || 0);
      
      const invoiceData = {
        ...formData,
        customerId: Number(formData.customerId) || 1,
        items: items.filter(item => item.description && item.quantity > 0),
        subtotal,
        taxAmount,
        totalAmount,
        amountPaid: Number(formData.amountPaid) || 0,
        dueAmount,
        status: formData.amountPaid >= totalAmount ? "paid" : 
               (formData.amountPaid > 0 ? "partial" : "pending"),
        paymentDate: formData.paymentDate || null,
        createdBy: "Current User",
      };
      
      await addInvoice(invoiceData);
      
      alert("Invoice created successfully!");
      navigate("/admin/invoices");
    } catch (error) {
      alert("Failed to create invoice. Please try again.");
      console.error("Create invoice error:", error);
    } finally {
      setFormLoading(false);
    }
  };
  
  const addItem = () => {
    setItems([...items, {
      id: Date.now(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      amount: 0
    }]);
  };
  
  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  };
  
  const fields = [
    { 
      type: "select", 
      label: "Customer", 
      name: "customerId", 
      required: true,
      options: [
        { label: "Select Customer", value: "" },
        { label: "Acme Corporation", value: "1" },
        { label: "Tech Solutions Ltd", value: "2" },
        { label: "Global Retail Inc", value: "3" },
        { label: "StartUp Innovations", value: "4" },
        { label: "EduTech Solutions", value: "5" },
      ]
    },
    { 
      type: "date", 
      label: "Issue Date", 
      name: "issueDate", 
      required: true,
      defaultValue: new Date().toISOString().split('T')[0]
    },
    { 
      type: "date", 
      label: "Due Date", 
      name: "dueDate", 
      required: true,
      defaultValue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    { 
      type: "textarea", 
      label: "Customer Address", 
      name: "customerAddress", 
      placeholder: "Enter customer billing address",
      rows: 2
    },
    {
      type: "textarea",
      label: "Notes",
      name: "notes",
      placeholder: "Additional notes about this invoice",
      rows: 2
    },
    {
      type: "textarea",
      label: "Terms & Conditions",
      name: "terms",
      placeholder: "Payment terms and conditions",
      rows: 2,
      defaultValue: "Payment due within 30 days. Late fees apply after due date."
    },
    { 
      type: "number", 
      label: "Tax Rate (%)", 
      name: "taxRate", 
      placeholder: "Enter tax rate percentage",
      defaultValue: 18,
      min: 0,
      max: 100,
      step: 0.01
    },
    { 
      type: "number", 
      label: "Discount (₹)", 
      name: "discount", 
      placeholder: "Enter discount amount",
      min: 0
    },
    {
      type: "select",
      label: "Payment Method",
      name: "paymentMethod",
      options: [
        { label: "Select Payment Method", value: "" },
        { label: "Cash", value: "Cash" },
        { label: "Credit Card", value: "Credit Card" },
        { label: "Debit Card", value: "Debit Card" },
        { label: "Bank Transfer", value: "Bank Transfer" },
        { label: "Cheque", value: "Cheque" },
        { label: "UPI", value: "UPI" },
        { label: "Other", value: "Other" },
      ]
    },
    { 
      type: "number", 
      label: "Amount Paid (₹)", 
      name: "amountPaid", 
      placeholder: "Enter amount paid",
      min: 0
    },
    { 
      type: "date", 
      label: "Payment Date", 
      name: "paymentDate", 
    },
    { 
      type: "text", 
      label: "Transaction ID", 
      name: "transactionId", 
      placeholder: "Enter transaction reference" 
    },
  ];

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const taxRate = 18; // Default tax rate
  const taxAmount = subtotal * (taxRate / 100);
  const discount = 0; // Default discount
  const totalAmount = subtotal + taxAmount - discount;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Invoice</h1>
        <p className="text-gray-600">Create and send a new invoice to your customer</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Invoice Items</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
                      min="1"
                      step="1"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      ₹{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                      disabled={items.length === 1}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="5" className="px-4 py-3">
                  <button
                    onClick={addItem}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    + Add Item
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="px-4 py-3 text-right font-medium text-gray-700">
                  Subtotal:
                </td>
                <td colSpan="2" className="px-4 py-3 font-bold text-gray-900">
                  ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="px-4 py-3 text-right font-medium text-gray-700">
                  Tax ({taxRate}%):
                </td>
                <td colSpan="2" className="px-4 py-3 font-bold text-gray-900">
                  ₹{taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="px-4 py-3 text-right font-medium text-gray-700">
                  Discount:
                </td>
                <td colSpan="2" className="px-4 py-3 font-bold text-gray-900">
                  ₹{discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="px-4 py-3 text-right font-medium text-gray-700">
                  Total Amount:
                </td>
                <td colSpan="2" className="px-4 py-3 font-bold text-xl text-gray-900">
                  ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      
      <CommonForm
        title="Invoice Details"
        subtitle="Fill in the invoice information"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={formLoading ? "Creating..." : "Create Invoice"}
      />
    </div>
  );
}