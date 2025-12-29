import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * customerId: number
 */
export const adminGetContacts = createAsyncThunk(
  "adminGetContacts/get",
  async (customerId, { rejectWithValue }) => {
    try {
      const res = await adminApi.get(`/customers/${customerId}/contacts`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch contacts"
      );
    }
  }
);
