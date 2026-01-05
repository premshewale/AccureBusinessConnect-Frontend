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

  // Get tickets from context
  // const { tickets, loading, deleteTicket, getTicketStats } = useTickets();
  // const ticketStats = getTicketStats();
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(getAllTickets());
}, [dispatch]);


  const {
    list: tickets,
    loading,
    error,
  } = useSelector((state) => state.tickets);

  // Refresh tickets
const handleRefresh = () => {
  dispatch(getAllTickets());
};

  // Prepare data for export
  const exportData = tickets.map((ticket) => ({
    ID: ticket.id,
    Title: ticket.title,
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

  // Filter tickets based on active filters
  const filteredTickets = tickets.filter((ticket) => {
    // Search filter
    if (
      searchQuery &&
      !ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ticket.description?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ticket.reporter?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Status filter buttons
    if (filter !== "All" && ticket.status !== filter) {
      return false;
    }

    // Additional filter options from filter panel
    if (
      filterOptions.status !== "All" &&
      ticket.status !== filterOptions.status
    ) {
      return false;
    }

    if (
      filterOptions.priority !== "All" &&
      ticket.priority !== filterOptions.priority
    ) {
      return false;
    }

    if (filterOptions.type !== "All" && ticket.type !== filterOptions.type) {
      return false;
    }

    if (
      filterOptions.assignee !== "All" &&
      ticket.assignee !== filterOptions.assignee
    ) {
      return false;
    }

    return true;
  });
  

  // Convert filtered tickets to Kanban format
  const kanbanColumns = [
    {
      title: "Open",
      cards: filteredTickets
        .filter((t) => t.status === "open")
        .map((ticket) => ({
          id: ticket.id,
          name: ticket.title,
          service: ticket.type,
          phone:
            ticket.priority === "high"
              ? "🔥 High"
              : ticket.priority === "medium"
              ? "⚠️ Medium"
              : "✅ Low",
          email: ticket.assignee,
          createdOn: new Date(ticket.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: "Open",
        })),
    },
    {
      title: "In Progress",
      cards: filteredTickets
        .filter((t) => t.status === "in_progress")
        .map((ticket) => ({
          id: ticket.id,
          name: ticket.title,
          service: ticket.type,
          phone:
            ticket.priority === "high"
              ? "🔥 High"
              : ticket.priority === "medium"
              ? "⚠️ Medium"
              : "✅ Low",
          email: ticket.assignee,
          createdOn: new Date(ticket.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: "In Progress",
        })),
    },
    {
      title: "Resolved",
      cards: filteredTickets
        .filter((t) => t.status === "resolved")
        .map((ticket) => ({
          id: ticket.id,
          name: ticket.title,
          service: ticket.type,
          phone:
            ticket.priority === "high"
              ? "🔥 High"
              : ticket.priority === "medium"
              ? "⚠️ Medium"
              : "✅ Low",
          email: ticket.assignee,
          createdOn: new Date(ticket.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: "Resolved",
        })),
    },
    {
      title: "Closed",
      cards: filteredTickets
        .filter((t) => t.status === "closed")
        .map((ticket) => ({
          id: ticket.id,
          name: ticket.title,
          service: ticket.type,
          phone:
            ticket.priority === "high"
              ? "🔥 High"
              : ticket.priority === "medium"
              ? "⚠️ Medium"
              : "✅ Low",
          email: ticket.assignee,
          createdOn: new Date(ticket.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          status: "Closed",
        })),
    },
  ];

  // Status options for filter buttons
  const statuses = ["All", "Open", "In Progress", "Resolved", "Closed"];

  const handleEdit = (ticket) => {
    navigate(`/admin/edit-ticket/${ticket.id}`);
  };

  

const handleDelete = (ticket) => {
  alert("Delete API not connected yet");
};


  const handleView = (ticket) => {
    navigate(`/admin/tickets/${ticket.id}`);
  };


  const ticketStats = {
  total: tickets.length,
  open: tickets.filter((t) => t.status === "open").length,
  inProgress: tickets.filter((t) => t.status === "in_progress").length,
  resolved: tickets.filter((t) => t.status === "resolved").length,
  closed: tickets.filter((t) => t.status === "closed").length,
};

  return (
    <div className="p-4">
      {/* Header */}
      {/* Ticket Statistics */}
<TicketStats stats={ticketStats} />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tickets</h1>
          <p className="text-gray-600">Manage and track all support tickets</p>
        </div>
        <button
          onClick={() => navigate("/admin/create-ticket")}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <FiPlus /> Create Ticket
        </button>
      </div>

      
      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center gap-4">
          {/* Use CommonExportButton */}
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
          {/* Search Bar */}
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

          {/* Filter Button */}
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

      {/* Filter Panel */}
      {showFilter && (
        <TicketFilter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={() => setShowFilter(false)}
        />
      )}

      {/* Status Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() =>
              setFilter(
                status === "All"
                  ? "All"
                  : status.toLowerCase().replace(" ", "_")
              )
            }
            className={`rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
              filter ===
              (status === "All"
                ? "All"
                : status.toLowerCase().replace(" ", "_"))
                ? "bg-cyan text-white border-cyan"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* View Toggle */}
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

      {/* Content Area */}
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
              onClick={() => navigate("/admin/create-ticket")}
              className="px-4 py-2 bg-cyan text-white rounded-lg hover:bg-cyan-700"
            >
              Create First Ticket
            </button>
          </div>
        ) : (
          <>
            {/* Kanban View */}
            {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}

            {/* Table View */}
            {activeTab === "table" && (
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
          </>
        )}
      </div>
    </div>
  );
}
