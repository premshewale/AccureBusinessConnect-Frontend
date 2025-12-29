import React from "react";

export default function CommonDetails({
  title,
  data,
  fields,
  isEditMode,
  editedData,
  setEditedData,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onConvert,
  showConvert,
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
    if (!isEditMode || field.readOnly) {
      return <p className="font-medium">{data[field.name] ?? "-"}</p>;
    }

    // SELECT (ENUM)
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

    // DEFAULT INPUT
    return (
      <input
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

        <div className="flex gap-2">
          {!isEditMode && (
            <button
              onClick={onEdit}
              className="px-4 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
          )}

          {isEditMode && (
            <>
              <button
                onClick={onSave}
                className="px-4 py-1 bg-green-600 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </>
          )}

          <button
            onClick={onDelete}
            className="px-4 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>

          {showConvert && (
            <button
              onClick={onConvert}
              className="px-4 py-1 bg-purple-600 text-white rounded"
            >
              Convert
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="text-sm text-gray-500">
              {field.label}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
}
