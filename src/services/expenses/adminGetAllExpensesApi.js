import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminGetAllExpenses = createAsyncThunk(
  "adminGetAllExpenses/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/expenses");

      // Debug logs (safe to remove later)
      console.log("GET /api/expenses → full response:", res);
      console.log("GET /api/expenses → response.data:", res.data);
      console.log("GET /api/expenses → first expense:", res.data?.[0]);

      return res.data; // expecting array of expenses
    } catch (error) {
      console.error(
        "GET /api/expenses → error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch expenses"
      );
    }
  }
);
