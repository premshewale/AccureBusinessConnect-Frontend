import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * GET CONTACT BY ID
 * GET /api/contacts/{id}
 */
export const adminGetContactById = createAsyncThunk(
  "contacts/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.get(`/contacts/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch contact"
      );
    }
  }
);
