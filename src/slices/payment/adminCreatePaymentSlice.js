import { createSlice } from "@reduxjs/toolkit";
import { adminCreatePaymentApi } from "../../services/payment/adminCreatePaymentApi";

const adminCreatePaymentSlice = createSlice({
  name: "adminCreatePayment",
  initialState: {
    loading: false,
    success: false,
    payment: null,
    error: null,
  },
  reducers: {
    resetCreatePaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.payment = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCreatePaymentApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminCreatePaymentApi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.payment = action.payload;
      })
      .addCase(adminCreatePaymentApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreatePaymentState } =
  adminCreatePaymentSlice.actions;

export default adminCreatePaymentSlice.reducer;
