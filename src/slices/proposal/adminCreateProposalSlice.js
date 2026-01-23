import { createSlice } from "@reduxjs/toolkit";
import { adminCreateProposalApi } from "../../services/proposal/adminCreateProposalApi";

const initialState = {
  loading: false,
  proposal: null,
  error: null,
};

const adminCreateProposalSlice = createSlice({
  name: "adminCreateProposal",
  initialState,
  reducers: {
    resetCreateProposalState: (state) => {
      state.loading = false;
      state.proposal = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCreateProposalApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminCreateProposalApi.fulfilled, (state, action) => {
        state.loading = false;
        state.proposal = action.payload;
      })
      .addCase(adminCreateProposalApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateProposalState } =
  adminCreateProposalSlice.actions;

export default adminCreateProposalSlice.reducer;
