import { createSlice } from "@reduxjs/toolkit";
import { adminCreateUser } from "../../services/user/adminCreateUserApi";

const initialState = {
  loading: false,
  success: false,
  createdUser: null,
  error: null,
};

const adminCreateUserSlice = createSlice({
  name: "adminCreateUser",
  initialState,
  reducers: {
    resetAdminCreateUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminCreateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminCreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdUser = action.payload;
      })
      .addCase(adminCreateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminCreateUser } = adminCreateUserSlice.actions;
export default adminCreateUserSlice.reducer;
