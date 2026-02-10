import React from "react";

const ShowDetails = ({ title, data = {}, excludeFields = [] }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">
        No details available
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {title && (
        <h2 className="text-xl font-semibold mb-5 text-gray-800">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(data)
          .filter(
            ([key]) =>
              !excludeFields.includes(key) &&
              data[key] !== null &&
              data[key] !== ""
          )
          .map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col border rounded-lg p-4 hover:shadow-sm transition"
            >
              <span className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                {formatLabel(key)}
              </span>
              <span className="text-sm font-medium text-gray-900 break-words">
                {formatValue(value)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

const formatLabel = (text) =>
  text
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

const formatValue = (value) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  return value.toString();
};

export default ShowDetails;
