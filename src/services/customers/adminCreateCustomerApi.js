import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * CREATE CUSTOMER
 * POST /api/customers
 */
export const adminCreateCustomer = createAsyncThunk(
  "customers/create",
  async (customerData, { rejectWithValue }) => {
    try {
      const res = await adminApi.post("/customers", customerData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to create customer"
      );
    }
  }
);
