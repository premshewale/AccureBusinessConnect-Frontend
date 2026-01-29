import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminDeleteExpense = createAsyncThunk(
  "adminDeleteExpense/delete",
  async (expenseId, { rejectWithValue }) => {
    try {
      const res = await adminApi.delete(`/expenses/${expenseId}`);

      console.log("DELETE /api/expenses → success:", res.data);

      // Expect backend to return deleted expense or at least { id }
      return res.data || { id: expenseId };
    } catch (error) {
      console.error(
        "DELETE /api/expenses → error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to delete expense"
      );
    }
  }
);
