import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";
import TicketStats from "./TicketStats.jsx";
import TicketFilter from "./TicketFilter.jsx";
import { getAllTickets } from "../../../services/ticket/ticketAPI";

export default function Tickets() {
  const [activeTab, setActiveTab] = useState("kanban");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: "All",
    priority: "All",
    type: "All",
    assignee: "All",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  const { list: tickets, loading, error } = useSelector((state) => state.tickets);
  const { role } = useSelector((state) => state.auth.user);
  const rolePath = role?.toLowerCase() || "admin";

  const handleRefresh = () => dispatch(getAllTickets());

  const exportData = tickets.map((ticket) => ({
    ID: ticket.id,
    Subject: ticket.subject,
    Description: ticket.description,
    Priority: ticket.priority,
    Status: ticket.status,
    Type: ticket.type,
    Assignee: ticket.assignee,
    Reporter: ticket.reporter,
    Customer: ticket.customerName,
    Created: ticket.createdAt,
    Updated: ticket.updatedAt,
    "Due Date": ticket.dueDate,
  }));

  const mapPriority = (priority) => {
    if (!priority) return "";
    switch (priority.toUpperCase()) {
      case "HIGH":
        return "🔥 High";
      case "MEDIUM":
        return "⚠️ Medium";
      case "LOW":
        return "✅ Low";
      case "CRITICAL":
        return "💥 Critical";
      default:
        return priority;
    }
  };

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    if (
      searchQuery &&
      !ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ticket.description?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ticket.reporter?.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    if (filter !== "All" && ticket.status?.toUpperCase() !== filter) return false;
    if (filterOptions.status !== "All" && ticket.status?.toUpperCase() !== filterOptions.status) return false;
    if (filterOptions.priority !== "All" && ticket.priority !== filterOptions.priority) return false;
    if (filterOptions.type !== "All" && ticket.type !== filterOptions.type) return false;
    if (filterOptions.assignee !== "All" && ticket.assignee !== filterOptions.assignee) return false;

    return true;
  });

  // Kanban columns
  const kanbanColumns = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((status) => ({
    title:
      status === "OPEN"
        ? "Open"
        : status === "IN_PROGRESS"
        ? "In Progress"
        : status === "RESOLVED"
        ? "Resolved"
        : "Closed",
    cards: filteredTickets
      .filter((t) => t.status?.toUpperCase() === status)
      .map((ticket) => ({
        id: ticket.id,
        name: ticket.subject || "",
        service: ticket.type || "",
        priorityLabel: mapPriority(ticket.priority),
        assignee: ticket.assignee || "",
        createdOn: ticket.createdAt
          ? new Date(ticket.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",
        status:
          status === "OPEN"
            ? "Open"
            : status === "IN_PROGRESS"
            ? "In Progress"
            : status === "RESOLVED"
            ? "Resolved"
            : "Closed",
      })),
  }));

  const statuses = ["All", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

  const handleEdit = (ticket) => {
    const id = ticket?.id ?? ticket;
    navigate(`/${rolePath}/edit-ticket/${id}`);
  };

const handleView = (ticket) => {
  const id = ticket?.id ?? ticket;
  navigate(`/${rolePath}/ticket/${id}/view`);
};

  const handleDelete = (ticket) => alert("Delete API not connected yet");

  const ticketStats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status?.toUpperCase() === "OPEN").length,
    inProgress: tickets.filter((t) => t.status?.toUpperCase() === "IN_PROGRESS").length,
    resolved: tickets.filter((t) => t.status?.toUpperCase() === "RESOLVED").length,
    closed: tickets.filter((t) => t.status?.toUpperCase() === "CLOSED").length,
  };

  return (
    <div className="p-4">
      <TicketStats stats={ticketStats} />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tickets</h1>
          <p className="text-gray-600">Manage and track all support tickets</p>
        </div>
        <button
          onClick={() => navigate(`/${rolePath}/create-ticket`)}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <FiPlus /> Create Ticket
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center gap-4">
          <CommonExportButton data={exportData} fileName="tickets" />
          <button
            onClick={handleRefresh}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Refresh"
          >
            <MdOutlineRefresh />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets by title, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 h-10 rounded-lg border pl-10 pr-3 text-sm outline-none focus:border-cyan"
            />
          </div>

          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              showFilter
                ? "bg-cyan text-white border-cyan"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <IoFilterSharp /> Filter
          </button>
        </div>
      </div>

      {showFilter && (
        <TicketFilter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={() => setShowFilter(false)}
        />
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status === "All" ? "All" : status)}
            className={`rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
              filter === status
                ? "bg-cyan text-white border-cyan"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {status === "OPEN"
              ? "Open"
              : status === "IN_PROGRESS"
              ? "In Progress"
              : status === "RESOLVED"
              ? "Resolved"
              : status === "CLOSED"
              ? "Closed"
              : "All"}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              activeTab === "kanban"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxDashboard /> Kanban View
          </button>
          <button
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              activeTab === "table"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxTable /> Table View
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <div className="text-4xl mb-4">🎫</div>
            <p className="text-lg mb-2">No tickets found</p>
            <p className="text-sm mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => navigate(`/${rolePath}/create-ticket`)}
              className="px-4 py-2 bg-cyan text-white rounded-lg hover:bg-cyan-700"
            >
              Create First Ticket
            </button>
          </div>
        ) : activeTab === "kanban" ? (
          <Kanban columns={kanbanColumns} />
        ) : (
          <CommonTable
            type="tickets"
            data={filteredTickets}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            showExport={false}
            showActions={true}
          />
        )}
      </div>
    </div>
  );
}
