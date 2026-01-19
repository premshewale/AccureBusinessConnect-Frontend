import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminDeleteProposalApi = createAsyncThunk(
  "adminDeleteProposal/delete",
  async (id, { rejectWithValue }) => {
    try {
      await adminApi.delete(`/proposals/${id}`);
      return id; // return deleted id
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete proposal"
      );
    }
  }
);
