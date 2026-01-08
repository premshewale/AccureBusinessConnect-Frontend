import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminDeleteCustomer } from "../../services/customers/adminDeleteCustomerApi";

/* =====================
   DELETE CUSTOMER THUNK
===================== */
export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminDeleteCustomer(id);
      return { id, message: res?.message || "Customer deleted successfully" };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminDeleteCustomerSlice = createSlice({
  name: "adminDeleteCustomer",
  initialState,
  reducers: {
    resetDeleteCustomerState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCustomer.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete customer";
        state.success = false;
      });
  },
});

export const { resetDeleteCustomerState } = adminDeleteCustomerSlice.actions;
export default adminDeleteCustomerSlice.reducer;
