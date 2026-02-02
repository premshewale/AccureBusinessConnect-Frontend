import React from "react";

export default function CommonDetails({
  title,
  data,
  fields,
  isEditMode,
  editedData,
  setEditedData,
  onSave,
  onBack,
  loading,
}) {
  const handleChange = (name, value) => {
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const renderField = (field) => {
  const value = editedData[field.name] ?? "";

  // READ ONLY
  if (field.readOnly) {
    return <p className="font-medium">{data[field.name] ?? "-"}</p>;
  }

  // SELECT
  if (field.type === "select") {
    return (
      <select
        className="w-full border p-2 rounded"
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
      >
        <option value="">Select {field.label}</option>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  // DEFAULT INPUT (now supports date, number, etc.)
  return (
    <input
      type={field.type || "text"}
      className="w-full border p-2 rounded"
      value={value}
      onChange={(e) => handleChange(field.name, e.target.value)}
    />
  );
};




  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* ✅ Only Save & Back */}
        <div className="flex gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            >
              Back
            </button>
          )}
          {onSave && (
            <button
              onClick={onSave}
              disabled={loading}
              className="px-4 py-2 bg-cyan text-white rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="text-sm text-gray-500">{field.label}</label>
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
}
