import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * GET PAYMENT BY ID
 * GET /api/payments/{id}
 */
export const adminGetPaymentById = createAsyncThunk(
  "payments/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.get(`/payments/${id}`);
      // return res.data.payment if your backend wraps it
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch payment details"
      );
    }
  }
);
