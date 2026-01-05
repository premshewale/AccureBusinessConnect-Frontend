// src/services/ticket/createTicketApi.js
import adminApi from "../../store/adminApi";

/**
 * CREATE TICKET
 * POST /api/tickets
 */
export const createTicket = async (ticketData) => {
  try {
    const res = await adminApi.post("/tickets", ticketData);

    // 🔥 Normalize backend data
    return {
      id: res.data.id,
      title: res.data.subject,
      description: res.data.description,
      priority: res.data.priority?.toLowerCase(),
      status: res.data.status?.toLowerCase(),
      customerName: res.data.customerName,
      reporter: res.data.contactName,
      assignee: res.data.assignedTo,
      createdAt: res.data.createdAt,
      dueDate: res.data.dueDate,
    };
  } catch (err) {
    throw err.response?.data || "Failed to create ticket";
  }
};
