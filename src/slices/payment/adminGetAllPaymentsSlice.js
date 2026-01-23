import { createSlice } from "@reduxjs/toolkit";
import { adminGetAllPaymentsApi } from "../../services/payment/adminGetAllPaymentsApi";

const adminGetAllPaymentsSlice = createSlice({
  name: "adminGetAllPayments",
  initialState: {
    loading: false,
    payments: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetAllPaymentsApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminGetAllPaymentsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(adminGetAllPaymentsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminGetAllPaymentsSlice.reducer;
