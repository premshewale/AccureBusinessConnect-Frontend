import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// ✅ Activate Contact
export const adminActivateContact = createAsyncThunk(
  "adminActivateContact/activate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/contacts/${id}/activate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate contact"
      );
    }
  }
);

// ✅ Deactivate Contact
export const adminDeactivateContact = createAsyncThunk(
  "adminDeactivateContact/deactivate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/contacts/${id}/deactivate`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate contact"
      );
    }
  }
);
