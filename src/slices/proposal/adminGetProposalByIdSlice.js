import { createSlice } from "@reduxjs/toolkit";
import { adminGetProposalByIdApi } from "../../services/proposal/adminGetProposalByIdApi";

const initialState = {
  loading: false,
  proposal: null,
  error: null,
};

const adminGetProposalByIdSlice = createSlice({
  name: "adminGetProposalById",
  initialState,
  reducers: {
    resetProposalDetails: (state) => {
      state.loading = false;
      state.proposal = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetProposalByIdApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetProposalByIdApi.fulfilled, (state, action) => {
        state.loading = false;
        state.proposal = action.payload;
      })
      .addCase(adminGetProposalByIdApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProposalDetails } =
  adminGetProposalByIdSlice.actions;

export default adminGetProposalByIdSlice.reducer;
