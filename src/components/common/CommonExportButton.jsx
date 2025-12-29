import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function CommonExportButton({
  data = [],
  fileName = "export",
}) {
  const [open, setOpen] = useState(false);

  // Check if data is valid
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <button
        disabled
        className="inline-flex justify-center items-center px-4 py-2 bg-gray-400 text-white rounded-lg shadow cursor-not-allowed"
      >
        <FiDownload className="mr-2" /> Export (No Data)
      </button>
    );
  }

  /* ================= EXPORT HELPERS ================= */

  const exportToCSV = () => {
    try {
      // Get headers from first object
      const headers = Object.keys(data[0]);
      
      // Create CSV rows
      const rows = data.map(row => {
        return headers.map(header => {
          const value = row[header];
          // Handle null/undefined and escape quotes
          if (value === null || value === undefined) return '""';
          const stringValue = String(value);
          // Escape quotes and wrap in quotes if contains comma or quotes
          const escaped = stringValue.replace(/"/g, '""');
          return stringValue.includes(',') || stringValue.includes('"') ? `"${escaped}"` : escaped;
        }).join(',');
      });

      const csvContent = [headers.join(','), ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert("CSV exported successfully!");
    } catch (error) {
      console.error("CSV export error:", error);
      alert("Failed to export CSV. Please try again.");
    }
  };

  const exportToExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
      alert("Excel exported successfully!");
    } catch (error) {
      console.error("Excel export error:", error);
      alert("Failed to export Excel. Please try again.");
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      const headers = Object.keys(data[0]);
      const rows = data.map(obj => headers.map(h => obj[h] || ''));

      autoTable(doc, {
        head: [headers],
        body: rows,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] },
      });

      doc.save(`${fileName}_${new Date().toISOString().split('T')[0]}.pdf`);
      alert("PDF exported successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  const handleExport = (type) => {
    setOpen(false);

    switch (type) {
      case "csv":
        exportToCSV();
        break;
      case "excel":
        exportToExcel();
        break;
      case "pdf":
        exportToPDF();
        break;
      case "print":
        window.print();
        break;
      default:
        break;
    }
  };

  /* ================= UI ================= */

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex justify-center items-center px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors"
      >
        <FiDownload className="mr-2" /> Export
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
          {["csv", "excel", "pdf", "print"].map(type => (
            <button
              key={type}
              onClick={() => handleExport(type)}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 capitalize"
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}