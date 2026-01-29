import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonDetails from "../../../components/common/CommonDetails.jsx";

// ✅ Import thunks from service files
import { getTicketById as fetchTicketById } from "../../../services/ticket/getTicketByIdApi.js";
import { updateTicket } from "../../../services/ticket/updateTicketApi.js";

// ✅ Import slice actions
import { resetTicketDetails } from "../../../slices/ticket/getTicketByIdSlice.js";

// 🔹 Local enums
const TICKET_PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
const TICKET_STATUS_OPTIONS = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, ticket, error } = useSelector((state) => state.getTicketById);
  const { loading: updateLoading } = useSelector((state) => state.updateTicket);

  const [editedData, setEditedData] = useState({});

  // 🔹 Fetch ticket details
  useEffect(() => {
    dispatch(fetchTicketById(id));
    return () => dispatch(resetTicketDetails());
  }, [dispatch, id]);

  // 🔹 Sync API data into form
  useEffect(() => {
    if (ticket) {
      setEditedData({
        id: ticket.id || "",
        subject: ticket.subject || "",
        description: ticket.description || "",
        priority: ticket.priority || "MEDIUM",
        status: ticket.status || "OPEN",
        customerName: ticket.customerName || "",
        contactName: ticket.contactName || "",
        assignedTo: ticket.assignedTo || "",
        departmentName: ticket.departmentName || "",
      });
    }
  }, [ticket]);

  // 🔹 Save handler
  const handleSave = async () => {
    try {
      await dispatch(updateTicket({ id, payload: editedData })).unwrap();
      alert("Ticket updated successfully");
      dispatch(fetchTicketById(id)); // Refresh data
    } catch (err) {
      alert(err?.message || "Failed to update ticket");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading ticket details...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!ticket) return <p className="text-center mt-6 text-gray-500">Ticket not found</p>;

  // 🔹 Form fields
  const ticketFields = [
    { name: "id", label: "Ticket ID", readOnly: true },
    { name: "subject", label: "Subject" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "priority", label: "Priority", type: "select", options: TICKET_PRIORITY_OPTIONS },
    { name: "status", label: "Status", type: "select", options: TICKET_STATUS_OPTIONS },
    { name: "customerName", label: "Customer", readOnly: true },
    { name: "contactName", label: "Contact Person", readOnly: true },
    { name: "assignedTo", label: "Assigned To" },
    { name: "departmentName", label: "Department", readOnly: true },
  ];

  return (
    <div className="p-6 md:p-12">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <CommonDetails
        title="Ticket Details"
        data={editedData}
        fields={ticketFields}
        isEditMode={true} // allow editing by default
        editedData={editedData}
        setEditedData={setEditedData}
        onSave={handleSave}
        loading={updateLoading}
        onBack={() => navigate("/admin/ticket")}
      />
    </div>
  );
}
