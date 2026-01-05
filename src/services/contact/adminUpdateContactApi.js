import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * UPDATE CONTACT
 * PUT /api/contacts/{id}
 */
export const adminUpdateContact = createAsyncThunk(
  "contacts/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/contacts/${id}`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to update contact"
      );
    }
  }
);
