import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * payload = {
 *   customerId: number,
 *   data: {
 *     firstName,
 *     lastName,
 *     email,
 *     phone,
 *     role,
 *     isPrimary
 *   }
 * }
 */
export const adminCreateContact = createAsyncThunk(
  "adminCreateContact/create",
  async ({ customerId, data }, { rejectWithValue }) => {
    try {
      const res = await adminApi.post(
        `/customers/${customerId}/contacts`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Contact creation failed"
      );
    }
  }
);
