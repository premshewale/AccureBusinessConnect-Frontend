import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * Update proposal status
 * PUT /api/proposals/{id}/status
 */
export const adminUpdateProposalStatusApi = createAsyncThunk(
  "adminProposal/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/proposals/${id}/status`, { status });
      return res.data; // MUST return updated proposal object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update proposal status"
      );
    }
  }
);
