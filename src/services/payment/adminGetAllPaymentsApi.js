import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminGetAllPaymentsApi = createAsyncThunk(
  "admin/payments/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/payments");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Server error"
      );
    }
  }
);
