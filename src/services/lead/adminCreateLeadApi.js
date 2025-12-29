import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminCreateLead = createAsyncThunk(
  "adminCreateLead/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await adminApi.post("/leads", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Lead creation failed"
      );
    }
  }
);
