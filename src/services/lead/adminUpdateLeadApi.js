import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi"; // axios instance

// Update lead by ID
export const adminUpdateLeadApi = createAsyncThunk(
  "adminLead/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await adminApi.put(`/leads/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update lead"
      );
    }
  }
);
