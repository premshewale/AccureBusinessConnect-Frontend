import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * PUT /api/tickets/{id}
 */
export const updateTicket = createAsyncThunk(
  "tickets/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/tickets/${id}`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update ticket");
    }
  }
);
