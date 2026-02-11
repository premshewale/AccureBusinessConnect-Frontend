import { createSlice } from "@reduxjs/toolkit";
import { adminGetAllProposals } from "../../services/proposal/adminGetAllProposalsApi";
import { adminDeleteProposalApi } from "../../services/proposal/adminDeleteProposalApi";
import { adminUpdateProposalStatusApi } from "../../services/proposal/adminUpdateProposalStatusApi";

const initialState = {
  loading: false,
  proposals: [],
  error: null,
};

const adminGetAllProposalsSlice = createSlice({
  name: "adminGetAllProposals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(adminGetAllProposals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetAllProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(adminGetAllProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(adminDeleteProposalApi.fulfilled, (state, action) => {
        state.proposals = state.proposals.filter(
          (proposal) => proposal.id !== action.payload
        );
      })

      // ✅ STATUS UPDATE (missing link)
      .addCase(adminUpdateProposalStatusApi.fulfilled, (state, action) => {
        state.proposals = state.proposals.map((proposal) =>
          proposal.id === action.payload.id ? action.payload : proposal
        );
      });
  },
});

export default adminGetAllProposalsSlice.reducer;
