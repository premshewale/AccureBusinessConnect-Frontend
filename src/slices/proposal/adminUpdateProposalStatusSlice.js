import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateProposalStatusApi } from "../../services/proposal/adminUpdateProposalStatusApi";

const initialState = {
  loading: false,
  success: false,
  updatedProposal: null,
  error: null,
};

const adminUpdateProposalStatusSlice = createSlice({
  name: "adminUpdateProposalStatus",
  initialState,
  reducers: {
    resetUpdateProposalStatusState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdateProposalStatusApi.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(adminUpdateProposalStatusApi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedProposal = action.payload;
      })
      .addCase(adminUpdateProposalStatusApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateProposalStatusState } =
  adminUpdateProposalStatusSlice.actions;

export default adminUpdateProposalStatusSlice.reducer;
