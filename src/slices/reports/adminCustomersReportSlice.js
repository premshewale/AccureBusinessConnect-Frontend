import { createSlice } from "@reduxjs/toolkit";
import { adminGetCustomersReport } from "../../services/reports/adminGetCustomersReportApi";

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

const adminCustomersReportSlice = createSlice({
  name: "adminCustomersReport",
  initialState,
  reducers: {
    resetCustomersReport: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetCustomersReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetCustomersReport.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(adminGetCustomersReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCustomersReport } =
  adminCustomersReportSlice.actions;

export default adminCustomersReportSlice.reducer;
