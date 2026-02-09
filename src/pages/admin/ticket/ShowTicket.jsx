import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ShowDetails from "../../../components/common/ShowDetails.jsx";
import { fetchTaskById, resetTaskState } from "../../../slices/tasks/tasksSlice.js";

export default function ShowTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Redux state
  const { task: ticket, loading, error } = useSelector((state) => state.tasks);
  const { role } = useSelector((state) => state.auth.user);
  const rolePath = role?.toLowerCase() || "admin";

  // Fetch ticket by ID
  useEffect(() => {
    if (id) dispatch(fetchTaskById(id));
    return () => dispatch(resetTaskState());
  }, [dispatch, id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-t-2 border-cyan rounded-full"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-500 mt-6">
        {typeof error === "string" ? error : "Failed to fetch ticket details"}
      </div>
    );
  }

  // Ticket not found
  if (!ticket) {
    return (
      <div className="text-center text-gray-500 mt-6">
        Ticket not found
      </div>
    );
  }

  // Format ticket fields
  const formattedTicket = {
    id: ticket.id || "-",
    subject: ticket.subject || "-",
    description: ticket.description || "-",
    priority: ticket.priority?.replace("_", " ") || "-",
    status: ticket.status?.replace("_", " ") || "-",
    customerId: ticket.customerId || "-",
    customerName: ticket.customerName || "-",
    contactId: ticket.contactId || "-",
    contactName: ticket.contactName || "-",
    departmentId: ticket.departmentId || "-",
    departmentName: ticket.departmentName || "-",
    assignedTo: ticket.assignedTo || "-",
    escalatedTo: ticket.escalatedTo || "-",
    createdAt: ticket.createdAt
      ? new Date(ticket.createdAt).toLocaleString("en-IN")
      : "-",
    updatedAt: ticket.updatedAt
      ? new Date(ticket.updatedAt).toLocaleString("en-IN")
      : "-",
  };

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(`/${rolePath}/ticket`)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      {/* Ticket details */}
      <ShowDetails title="Ticket Details" data={formattedTicket} />
    </div>
  );
}
