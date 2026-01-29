import { createSlice } from "@reduxjs/toolkit";
import { adminGetLeadsReport } from "../../services/reports/adminGetLeadsReportApi";

const initialState = {
  leads: [],
  loading: false,
  error: null,
};

const adminLeadsReportSlice = createSlice({
  name: "adminLeadsReport",
  initialState,
  reducers: {
    resetLeadsReport: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetLeadsReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetLeadsReport.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(adminGetLeadsReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLeadsReport } = adminLeadsReportSlice.actions;

export default adminLeadsReportSlice.reducer;
