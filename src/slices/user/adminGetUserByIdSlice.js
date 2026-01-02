import { createSlice } from "@reduxjs/toolkit";
import { adminGetUserById } from "../../services/user/adminGetUserByIdApi";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const adminGetUserByIdSlice = createSlice({
  name: "adminGetUserById",
  initialState,
  reducers: {
    resetAdminGetUserById: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(adminGetUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminGetUserById } =
  adminGetUserByIdSlice.actions;

export default adminGetUserByIdSlice.reducer;
