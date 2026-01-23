import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// ✅ Activate customer
export const adminActivateCustomer = createAsyncThunk(
  "adminActivateCustomer/activate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/customers/${id}/activate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate customer"
      );
    }
  }
);

// ✅ Deactivate customer
export const adminDeactivateCustomer = createAsyncThunk(
  "adminDeactivateCustomer/deactivate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/customers/${id}/deactivate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate customer"
      );
    }
  }
);
