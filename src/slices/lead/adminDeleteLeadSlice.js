// src/slices/lead/adminDeleteLeadSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// Thunk to delete lead by ID
export const adminDeleteLeadApi = createAsyncThunk(
  "adminLead/delete",
  async (id, { rejectWithValue }) => {
    try {
      await adminApi.delete(`/leads/${id}`);
      return id; // return deleted lead id
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete lead"
      );
    }
  }
);

// Slice
const adminDeleteLeadSlice = createSlice({
  name: "adminDeleteLead",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetDeleteLeadState: (state) => ({ loading: false, success: false, error: null }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminDeleteLeadApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminDeleteLeadApi.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminDeleteLeadApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeleteLeadState } = adminDeleteLeadSlice.actions;
export default adminDeleteLeadSlice.reducer;
