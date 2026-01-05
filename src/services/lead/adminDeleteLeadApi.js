import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminDeleteLeadApi = createAsyncThunk(
  "adminLead/delete",
  async (id, { rejectWithValue }) => {
    try {
      await adminApi.delete(`/leads/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete lead"
      );
    }
  }
);

const adminDeleteLeadSlice = createSlice({
  name: "adminDeleteLead",
  initialState: {},
  reducers: {
    resetAdminDeleteLeadState: (state) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminDeleteLeadApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminDeleteLeadApi.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedId = action.payload;
      })
      .addCase(adminDeleteLeadApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminDeleteLeadState } = adminDeleteLeadSlice.actions;

export default adminDeleteLeadSlice.reducer;
