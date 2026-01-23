import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminCreatePaymentApi = createAsyncThunk(
  "admin/payments/create",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await adminApi.post("/payments", paymentData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to create payment"
      );
    }
  }
);
