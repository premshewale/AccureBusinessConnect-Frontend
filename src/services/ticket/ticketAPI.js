import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * GET ALL TICKETS (Dept View)
 * GET /api/tickets
 */
export const getAllTickets = createAsyncThunk(
  "tickets/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/tickets");

      // 🔥 NORMALIZE BACKEND DATA HERE
      return res.data.map((t) => ({
        id: t.id,
        title: t.subject,
        description: t.description,
        priority: t.priority?.toLowerCase(),
        status: t.status?.toLowerCase(),
        customerName: t.customerName,
        reporter: t.contactName,
        assignee: t.assignedTo,
        createdAt: t.createdAt,
        dueDate: t.dueDate,
      }));
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch tickets");
    }
  }
);
