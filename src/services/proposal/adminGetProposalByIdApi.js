import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminGetProposalByIdApi = createAsyncThunk(
  "adminGetProposalById/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.get(`/proposals/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch proposal details"
      );
    }
  }
);
