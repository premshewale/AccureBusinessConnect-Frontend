import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateProposalApi } from "../../services/proposal/adminUpdateProposalApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminUpdateProposalSlice = createSlice({
  name: "adminUpdateProposal",
  initialState,
  reducers: {
    resetUpdateProposalState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdateProposalApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminUpdateProposalApi.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminUpdateProposalApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateProposalState } =
  adminUpdateProposalSlice.actions;

export default adminUpdateProposalSlice.reducer;
