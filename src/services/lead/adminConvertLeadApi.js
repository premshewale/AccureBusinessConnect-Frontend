import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi"; // axios instance

// Convert Lead to Customer
export const adminConvertLeadApi = createAsyncThunk(
  "adminLead/convert",
  async ({ leadId, ...data }, { rejectWithValue }) => {
    try {
      const response = await adminApi.post(
        `/leads/${leadId}/convert`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to convert lead"
      );
    }
  }
);
