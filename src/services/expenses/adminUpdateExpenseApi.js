import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminUpdateExpense = createAsyncThunk(
  "adminUpdateExpense/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/expenses/${id}`, payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Expense update failed"
      );
    }
  }
);
