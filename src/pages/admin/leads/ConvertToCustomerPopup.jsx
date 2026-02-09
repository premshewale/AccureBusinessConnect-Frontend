import React, { useState } from "react";

export default function ConvertToCustomerPopup({
  open,
  onClose,
  onSubmit,
  leadId,
}) {
  const [formData, setFormData] = useState({
    customerType: "REGULAR",
    industry: "",
    address: "",
    website: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = () => {
  if (!leadId) {
    alert("Lead ID missing");
    return;
  }

  onSubmit({
    leadId,
    ...formData,
  });
};

  return (
    // ✅ Overlay click closes popup
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      {/* ✅ Stop click inside popup */}
      <div
        className="bg-white w-[420px] rounded-xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Convert to Customer</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Customer Type</label>
            <select
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="VIP">VIP</option>
              <option value="REGULAR">Regular</option>
              <option value="ONE_TIME">One Time</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-cyan text-white rounded-md"
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}
