import { createSlice } from "@reduxjs/toolkit";
import {
  adminActivateCustomer,
  adminDeactivateCustomer,
} from "../../services/customers/adminToggleCustomerStatusApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminToggleCustomerStatusSlice = createSlice({
  name: "adminToggleCustomerStatus",
  initialState,
  reducers: {
    resetAdminToggleCustomerStatus: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Activate
      .addCase(adminActivateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminActivateCustomer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminActivateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Deactivate
      .addCase(adminDeactivateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminDeactivateCustomer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminDeactivateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminToggleCustomerStatus } =
  adminToggleCustomerStatusSlice.actions;

export default adminToggleCustomerStatusSlice.reducer;
