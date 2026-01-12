import { createSlice } from "@reduxjs/toolkit";
import { adminGetPaymentById } from "../../services/payment/adminGetPaymentByIdApi";

const initialState = {
  loading: false,
  payment: null,
  error: null,
};

const adminGetPaymentByIdSlice = createSlice({
  name: "adminGetPaymentById",
  initialState,
  reducers: {
    resetPaymentDetails: (state) => {
      state.loading = false;
      state.payment = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(adminGetPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch payment details";
      });
  },
});

export const { resetPaymentDetails } =
  adminGetPaymentByIdSlice.actions;

export default adminGetPaymentByIdSlice.reducer;
