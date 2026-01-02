import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminGetAllLeads = createAsyncThunk(
  "adminGetAllLeads/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/leads");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch leads"
      );
    }
  }
);
