import { createSlice } from "@reduxjs/toolkit";
import { adminGetDashboardCounts } from "../../services/dashboard/adminGetDashboardCountsApi";

const initialState = {
  counts: {
    totalCustomers: 0,
    totalLeads: 0,
    totalInvoices: 0,
    totalTasks: 0,
  },
  loading: false,
  error: null,
};

const dashboardCountsSlice = createSlice({
  name: "dashboardCounts",
  initialState,
  reducers: {
    resetDashboardCounts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetDashboardCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetDashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.counts = action.payload;
      })
      .addCase(adminGetDashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDashboardCounts } = dashboardCountsSlice.actions;
export default dashboardCountsSlice.reducer;
