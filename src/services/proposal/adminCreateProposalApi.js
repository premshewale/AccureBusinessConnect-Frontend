import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminCreateProposalApi = createAsyncThunk(
  "adminCreateProposal/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await adminApi.post("/proposals", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create proposal"
      );
    }
  }
);
