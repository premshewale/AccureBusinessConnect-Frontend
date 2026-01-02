import { createSlice } from "@reduxjs/toolkit";
import { adminGetLeadByIdApi } from "../../services/lead/adminGetLeadByIdApi";

const initialState = {
  loading: false,
  lead: null,
  error: null,
};

const adminGetLeadByIdSlice = createSlice({
  name: "adminGetLeadById",
  initialState,
  reducers: {
    resetLeadDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetLeadByIdApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetLeadByIdApi.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
      })
      .addCase(adminGetLeadByIdApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLeadDetails } = adminGetLeadByIdSlice.actions;
export default adminGetLeadByIdSlice.reducer;
