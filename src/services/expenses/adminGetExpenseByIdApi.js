import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminGetExpenseById = createAsyncThunk(
  "adminGetExpenseById/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.get(`/expenses/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch expense details"
      );
    }
  }
);
