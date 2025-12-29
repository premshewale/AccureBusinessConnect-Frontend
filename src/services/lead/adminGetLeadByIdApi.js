import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi"; // axios instance

// Fetch lead details by ID
export const adminGetLeadByIdApi = createAsyncThunk(
  "adminLead/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.get(`/leads/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch lead details"
      );
    }
  }
);
