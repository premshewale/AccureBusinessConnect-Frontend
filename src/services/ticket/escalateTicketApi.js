import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../store/adminApi"; // same axios instance you use

export const escalateTicketApi = createAsyncThunk(
  "tickets/escalate",
  async (ticketId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/tickets/${ticketId}/escalate`);
      return res.data; // updated ticket
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to escalate ticket"
      );
    }
  }
);
