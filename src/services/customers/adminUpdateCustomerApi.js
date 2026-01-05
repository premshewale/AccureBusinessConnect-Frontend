import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * UPDATE CUSTOMER
 * PUT /api/customers/{id}
 */
export const adminUpdateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/customers/${id}`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to update customer"
      );
    }
  }
);
