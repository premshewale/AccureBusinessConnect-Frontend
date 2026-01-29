import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// ✅ Add contact to Google
export const adminAddContactToGoogle = createAsyncThunk(
  "adminContactGoogle/add",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.post(
        `/contacts/${id}/google/add`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add contact to Google"
      );
    }
  }
);

// ✅ Remove contact from Google
export const adminRemoveContactFromGoogle = createAsyncThunk(
  "adminContactGoogle/remove",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.delete(
        `/contacts/${id}/google/remove`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove contact from Google"
      );
    }
  }
);
