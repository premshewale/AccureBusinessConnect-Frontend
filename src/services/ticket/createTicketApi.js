import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const createTicketThunk = createAsyncThunk(
  "tickets/create",
  async (ticketData, { rejectWithValue }) => {
    try {
      const res = await adminApi.post("/tickets", ticketData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to create ticket"
      );
    }
  }
);
