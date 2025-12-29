import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi"; // axios instance

// Convert Lead to Customer
export const adminConvertLeadApi = createAsyncThunk(
  "adminLead/convert",
  async ({ leadId, payload }, { rejectWithValue }) => {
    try {
      const response = await adminApi.post(
        `/leads/${leadId}/convert`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to convert lead to customer"
      );
    }
  }
);
