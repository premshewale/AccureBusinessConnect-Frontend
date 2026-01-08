import { createSlice } from "@reduxjs/toolkit";
import { adminDeleteUser } from "../../services/user/adminDeleteUserApi";

const initialState = {
  loading: false,
  success: false,
  deletedUserId: null,
  error: null,
};

const adminDeleteUserSlice = createSlice({
  name: "adminDeleteUser",
  initialState,
  reducers: {
    resetAdminDeleteUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminDeleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.deletedUserId = action.payload.id;
      })
      .addCase(adminDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminDeleteUser } =
  adminDeleteUserSlice.actions;

export default adminDeleteUserSlice.reducer;
