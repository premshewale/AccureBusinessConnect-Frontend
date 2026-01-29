import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * GET /api/tickets/{id}
 */
export const getTicketById = createAsyncThunk(
  "tickets/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.get(`/tickets/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch ticket");
    }
  }
);
