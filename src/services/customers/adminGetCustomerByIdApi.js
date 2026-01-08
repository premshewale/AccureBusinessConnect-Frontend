import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * GET CUSTOMER BY ID
 * GET /api/customers/{id}
 */
export const adminGetCustomerById = createAsyncThunk(
  "customers/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.get(`/customers/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch customer");
    }
  }
);
