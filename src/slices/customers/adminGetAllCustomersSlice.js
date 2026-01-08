import { createSlice } from "@reduxjs/toolkit";
import { adminGetAllCustomers } from "../../services/customers/adminGetAllCustomersApi";

const initialState = {
  loading: false,
  customers: [],
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
  error: null,
};

const adminGetAllCustomersSlice = createSlice({
  name: "adminGetAllCustomers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminGetAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetAllCustomers.fulfilled, (state, action) => {
        state.loading = false;

        // Spring Page response support
        state.customers = action.payload.content || [];
        state.page = action.payload.page ?? 0;
        state.size = action.payload.size ?? 10;
        state.totalPages = action.payload.totalPages ?? 0;
        state.totalElements = action.payload.totalElements ?? 0;
      })
      .addCase(adminGetAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminGetAllCustomersSlice.reducer;
