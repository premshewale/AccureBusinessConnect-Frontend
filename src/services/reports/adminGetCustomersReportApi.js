import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// ✅ Get Customers Report (FULL DATA)
export const adminGetCustomersReport = createAsyncThunk(
  "adminGetCustomersReport/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/customers");
      return res.data; // 🔥 return as-is
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch customers report"
      );
    }
  }
);
