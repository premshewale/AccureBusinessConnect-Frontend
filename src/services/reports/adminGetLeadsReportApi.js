import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// ✅ Get Leads Report
export const adminGetLeadsReport = createAsyncThunk(
  "adminGetLeadsReport/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/leads");
      return res.data; // array of leads
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch leads report"
      );
    }
  }
);
