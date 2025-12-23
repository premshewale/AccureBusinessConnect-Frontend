import { createAsyncThunk } from "@reduxjs/toolkit";
import subAdminApi from "../../store/subAdminApi";

export const adminCreateStaff = createAsyncThunk(
  "adminCreateStaff/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await subAdminApi.post("/users", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Staff creation failed"
      );
    }
  }
);
