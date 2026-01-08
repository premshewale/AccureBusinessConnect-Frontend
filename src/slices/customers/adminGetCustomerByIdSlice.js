import { createSlice } from "@reduxjs/toolkit";
import { adminGetCustomerById } from "../../services/customers/adminGetCustomerByIdApi";

const initialState = {
  loading: false,
  customer: null,
  error: null,
};

const adminGetCustomerByIdSlice = createSlice({
  name: "adminGetCustomerById",
  initialState,
  reducers: {
    resetCustomerDetails: (state) => {
      state.loading = false;
      state.customer = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload; // ✅ API returns flat object
      })
      .addCase(adminGetCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch customer details";
      });
  },
});

export const { resetCustomerDetails } = adminGetCustomerByIdSlice.actions;
export default adminGetCustomerByIdSlice.reducer;
