import { createSlice } from "@reduxjs/toolkit";
import { adminGetExpenseById } from "../../services/expenses/adminGetExpenseByIdApi";

const initialState = {
  loading: false,
  expense: null,
  error: null,
};

const adminGetExpenseByIdSlice = createSlice({
  name: "adminGetExpenseById",
  initialState,
  reducers: {
    resetAdminGetExpenseById: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetExpenseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetExpenseById.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload;
      })
      .addCase(adminGetExpenseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminGetExpenseById } =
  adminGetExpenseByIdSlice.actions;

export default adminGetExpenseByIdSlice.reducer;
