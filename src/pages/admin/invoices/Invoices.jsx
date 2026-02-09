import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";
import InvoicesStats from "./InvoicesStats.jsx";
import InvoicesFilter from "./InvoicesFilter.jsx";

import { useDispatch, useSelector } from "react-redux";
import { getAllInvoices } from "../../../services/invoices/invoiceApi";

export default function Invoices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { invoices = [], loading } = useSelector((state) => state.invoices);
  const role = useSelector((state) => state.auth.role);
  const rolePath = role?.toLowerCase().replace("_", "-") || "admin";

  // ENUM from DB
  const STATUS_ENUMS = [
    "DRAFT",
    "SENT",
    "PAID",
    "UNPAID",
    "OVERDUE",
    "CANCELLED",
  ];

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return isNaN(d.getTime())
      ? "N/A"
      : d.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const formatCurrency = (value) =>
    `₹${(Number(value) || 0).toLocaleString("en-IN")}`;

  // dynamic stats
  const invoiceStats = {
    total: invoices.length,
    totalAmount: invoices.reduce((sum, i) => sum + (i.totalAmount || 0), 0),
    paid: invoices.filter((i) => i.status === "PAID").length,
    unpaid: invoices.filter((i) => i.status === "UNPAID").length,
    overdue: invoices.filter((i) => i.status === "OVERDUE").length,
  };

  // export data
  const exportData = invoices.map((invoice) => ({
    "Invoice No": invoice.invoiceNumber,
    Customer: invoice.customerName,
    "Issue Date": formatDate(invoice.issueDate),
    "Due Date": formatDate(invoice.dueDate),
    "Total Amount": formatCurrency(invoice.totalAmount),
    Status: invoice.status,
    "Created At": formatDate(invoice.createdAt),
  }));

  // search + status filter
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      !searchQuery ||
      invoice.invoiceNumber
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      invoice.customerName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      invoice.customerEmail
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // latest first
  const sortedInvoices = [...filteredInvoices].sort(
    (a, b) => new Date(b.issueDate) - new Date(a.issueDate)
  );

  // Kanban columns from ENUM dynamically
  const kanbanColumns = STATUS_ENUMS.map((status) => ({
    title: status,
    cards: sortedInvoices
      .filter((i) => i.status === status)
      .map((invoice) => ({
        id: invoice.id,
        name: invoice.invoiceNumber,
        service: invoice.customerName,
        phone: formatCurrency(invoice.totalAmount),
        email: invoice.customerEmail || "N/A",
        createdOn: formatDate(invoice.issueDate),
        status,
        raw: invoice, // keep full object if needed later
      })),
  }));

  const handleRefresh = () => {
    dispatch(getAllInvoices());
  };

  // KEEP navigate format: /{rolePath}/invoices/{id}
  const goToInvoice = (item) => {
    const id = typeof item === "object" ? item.id : item;
    if (!id) return;
    navigate(`/${rolePath}/invoices/${id}`);
  };

  const handleEdit = (invoice) => {
    goToInvoice(invoice);
  };

const handleView = (invoice) => {
  const id = invoice?.id || invoice;
  if (!id) return;
  navigate(`/${rolePath}/invoices/${id}/view`);
};

  const handleCreateInvoice = () => {
    navigate(`/${rolePath}/create-invoice`);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
          <p className="text-gray-600">Manage and track all invoices</p>
        </div>
        <button
          onClick={handleCreateInvoice}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700"
        >
          + Create Invoice
        </button>
      </div>

      {/* Stats */}
      <InvoicesStats stats={invoiceStats} />

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow border">
        <CommonExportButton data={exportData} fileName="invoices" />

        <button
          onClick={handleRefresh}
          className="p-2 border rounded-lg hover:bg-gray-50"
        >
          <MdOutlineRefresh />
        </button>

        <div className="relative flex-1 min-w-[220px]">
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoice, customer, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 rounded-lg border pl-10 pr-3 text-sm outline-none focus:border-cyan"
          />
        </div>

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 rounded-lg border flex items-center gap-2 hover:bg-gray-50"
        >
          <IoFilterSharp /> Filter
        </button>
      </div>

      {/* Status buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setStatusFilter("ALL")}
          className={`px-4 py-2 rounded-lg border ${
            statusFilter === "ALL"
              ? "bg-cyan text-white border-cyan"
              : "bg-white border-gray-300"
          }`}
        >
          All
        </button>

        {STATUS_ENUMS.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg border ${
              statusFilter === status
                ? "bg-cyan text-white border-cyan"
                : "bg-white border-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {sortedInvoices.length} of {invoices.length} invoices
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              activeTab === "kanban"
                ? "bg-white border-cyan text-cyan shadow"
                : "border-gray-300"
            }`}
          >
            <RxDashboard /> Kanban
          </button>

          <button
            onClick={() => setActiveTab("table")}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              activeTab === "table"
                ? "bg-white border-cyan text-cyan shadow"
                : "border-gray-300"
            }`}
          >
            <RxTable /> Table
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow border p-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-cyan rounded-full"></div>
          </div>
        ) : sortedInvoices.length === 0 ? (
          <div className="text-center text-gray-500 p-8">
            No invoices found
          </div>
        ) : activeTab === "kanban" ? (
          <Kanban
            columns={kanbanColumns.map((col) => ({
              ...col,
              cards: col.cards.map((card) => ({
                ...card,
                onClick: () => goToInvoice(card.id),
              })),
            }))}
          />
        ) : (
          <CommonTable
            type="invoices"
            data={sortedInvoices}
            onEdit={handleEdit}
            onView={handleView}
            showActions={true}
            showExport={false}
          />
        )}
      </div>
    </div>
  );
}
