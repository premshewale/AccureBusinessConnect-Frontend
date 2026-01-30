import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonDetails from "../../../components/common/CommonDetails.jsx";

// Thunks
import { getTicketById as fetchTicketById } from "../../../services/ticket/getTicketByIdApi.js";
import { updateTicket } from "../../../services/ticket/updateTicketApi.js";

// Slice actions
import { resetTicketDetails } from "../../../slices/ticket/getTicketByIdSlice.js";

// Enums (match API)
const TICKET_PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
const TICKET_STATUS_OPTIONS = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { loading, ticket, error } = useSelector((state) => state.getTicketById);
  const { loading: updateLoading } = useSelector((state) => state.updateTicket);
  const { role } = useSelector((state) => state.auth.user);
  const rolePath = role?.toLowerCase() || "admin";

  // Local state
  const [editedData, setEditedData] = useState({});

  // Fetch ticket details
  useEffect(() => {
    dispatch(fetchTicketById(id));
    return () => dispatch(resetTicketDetails());
  }, [dispatch, id]);

  // Sync API data into form
  useEffect(() => {
    if (ticket) {
      setEditedData({
        id: ticket.id || "",
        subject: ticket.subject || "",
        description: ticket.description || "",
        priority: ticket.priority?.toUpperCase() || "MEDIUM",
        status: ticket.status?.toUpperCase() || "OPEN",
        customerId: ticket.customerId || "",
        customerName: ticket.customerName || "",
        contactId: ticket.contactId || "",
        contactName: ticket.contactName || "",
        departmentId: ticket.departmentId || "",
        departmentName: ticket.departmentName || "",
        assignedTo: ticket.assignedTo || "",
        escalatedTo: ticket.escalatedTo || "",
      });
    }
  }, [ticket]);

  // Save handler
  const handleSave = async () => {
    try {
      await dispatch(updateTicket({ id, payload: editedData })).unwrap();
      alert("Ticket updated successfully");

      // Navigate to the ticket page after save
      navigate(`/${rolePath}/ticket`);
    } catch (err) {
      alert(err?.message || "Failed to update ticket");
    }
  };

  // Loading / Error / Not Found
  if (loading) return <p className="text-center mt-6">Loading ticket details...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!ticket) return <p className="text-center mt-6 text-gray-500">Ticket not found</p>;

  // Form fields
  const ticketFields = [
    { name: "id", label: "Ticket ID", readOnly: true },
    { name: "subject", label: "Subject" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "priority", label: "Priority", type: "select", options: TICKET_PRIORITY_OPTIONS },
    { name: "status", label: "Status", type: "select", options: TICKET_STATUS_OPTIONS },
    { name: "customerId", label: "Customer ID", readOnly: true },
    { name: "customerName", label: "Customer Name", readOnly: true },
    { name: "contactId", label: "Contact ID", readOnly: true },
    { name: "contactName", label: "Contact Person", readOnly: true },
    { name: "departmentId", label: "Department ID", readOnly: true },
    { name: "departmentName", label: "Department Name", readOnly: true },
    { name: "assignedTo", label: "Assigned To" },
    { name: "escalatedTo", label: "Escalated To", readOnly: true },
  ];

  return (
    <div className="p-6 md:p-12">
      {/* Back Button */}
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        onClick={() => navigate(`/${rolePath}/tickets`)}
      >
        ← Back
      </button>

      {/* Ticket Form */}
      <CommonDetails
        title="Ticket Details"
        data={editedData}
        fields={ticketFields}
        isEditMode={true}
        editedData={editedData}
        setEditedData={setEditedData}
        onSave={handleSave}
        loading={updateLoading}
        onBack={() => navigate(`/${rolePath}/tickets`)}
      />
    </div>
  );
}
