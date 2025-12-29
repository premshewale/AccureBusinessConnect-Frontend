import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi"; // axios instance

// Delete lead by ID
export const adminDeleteLeadApi = createAsyncThunk(
  "adminLead/delete",
  async (id, { rejectWithValue }) => {
    try {
      await adminApi.delete(`/leads/${id}`);

      return id; // 🔥 IMPORTANT: return deleted lead id
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete lead"
      );
    }
  }
);
