import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateCustomer } from "../../services/customers/adminUpdateCustomerApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminUpdateCustomerSlice = createSlice({
  name: "adminUpdateCustomer",
  initialState,
  reducers: {
    resetUpdateCustomerState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminUpdateCustomer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminUpdateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateCustomerState } =
  adminUpdateCustomerSlice.actions;

export default adminUpdateCustomerSlice.reducer;
