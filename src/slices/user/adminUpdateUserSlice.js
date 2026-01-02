import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateUser } from "../../services/user/adminUpdateUserApi";

const initialState = {
  loading: false,
  success: false,
  updatedUser: null,
  error: null,
};

const adminUpdateUserSlice = createSlice({
  name: "adminUpdateUser",
  initialState,
  reducers: {
    resetAdminUpdateUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedUser = action.payload;
      })
      .addCase(adminUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminUpdateUser } =
  adminUpdateUserSlice.actions;

export default adminUpdateUserSlice.reducer;
