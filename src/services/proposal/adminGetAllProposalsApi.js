import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminGetAllProposals = createAsyncThunk(
  "adminGetAllProposals/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/proposals");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch proposals"
      );
    }
  }
);
