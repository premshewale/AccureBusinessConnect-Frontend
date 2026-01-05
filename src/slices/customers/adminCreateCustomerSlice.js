import { createSlice } from "@reduxjs/toolkit";
import { adminCreateCustomer } from "../../services/customers/adminCreateCustomerApi";

const initialState = {
  loading: false,
  customer: null,
  success: false,
  error: null,
};

const adminCreateCustomerSlice = createSlice({
  name: "adminCreateCustomer",
  initialState,
  reducers: {
    resetCreateCustomerState: (state) => {
      state.loading = false;
      state.customer = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCreateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminCreateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
        state.success = true;
      })
      .addCase(adminCreateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetCreateCustomerState } =
  adminCreateCustomerSlice.actions;

export default adminCreateCustomerSlice.reducer;
