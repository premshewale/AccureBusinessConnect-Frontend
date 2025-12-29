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

  if (!data || data.length === 0) return null;

  /* ================= EXPORT HELPERS ================= */

  const exportToCSV = () => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row =>
      Object.values(row)
        .map(val => `"${val ?? ""}"`)
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.csv`;
    a.click();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => headers.map(h => obj[h]));

    autoTable(doc, {
      head: [headers],
      body: rows,
    });

    doc.save(`${fileName}.pdf`);
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
        className="inline-flex justify-center items-center px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700"
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
