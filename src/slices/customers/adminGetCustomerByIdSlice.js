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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminGetCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(adminGetCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminGetCustomerByIdSlice.reducer;
