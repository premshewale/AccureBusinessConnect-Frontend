import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminCreateExpense = createAsyncThunk(
  "adminCreateExpense/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await adminApi.post("/expenses", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Expense creation failed"
      );
    }
  }
);
