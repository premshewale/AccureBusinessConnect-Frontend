import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateExpense } from "../../services/expenses/adminUpdateExpenseApi";

const initialState = {
  loading: false,
  success: false,
  updatedExpense: null,
  error: null,
};

const adminUpdateExpenseSlice = createSlice({
  name: "adminUpdateExpense",
  initialState,
  reducers: {
    resetAdminUpdateExpense: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminUpdateExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedExpense = action.payload;
      })
      .addCase(adminUpdateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminUpdateExpense } =
  adminUpdateExpenseSlice.actions;

export default adminUpdateExpenseSlice.reducer;
