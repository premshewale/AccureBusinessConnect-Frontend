import { createSlice } from "@reduxjs/toolkit";
import { adminGetAllExpenses } from "../../services/expenses/adminGetAllExpensesApi";
import { adminDeleteExpense } from "../../services/expenses/adminDeleteExpenseApi";
import { adminCreateExpense } from "../../services/expenses/adminCreateExpenseApi";

const initialState = {
  loading: false,
  expenses: [],
  error: null,
};

const adminGetAllExpensesSlice = createSlice({
  name: "adminGetAllExpenses",
  initialState,
  reducers: {
    resetAdminGetAllExpenses: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ✅ GET ALL EXPENSES
      .addCase(adminGetAllExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetAllExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(adminGetAllExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ CREATE EXPENSE
      .addCase(adminCreateExpense.fulfilled, (state, action) => {
        state.expenses.unshift(action.payload);
      })

      // ✅ DELETE EXPENSE
      .addCase(adminDeleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        );
      });
  },
});

export const { resetAdminGetAllExpenses } =
  adminGetAllExpensesSlice.actions;

export default adminGetAllExpensesSlice.reducer;
