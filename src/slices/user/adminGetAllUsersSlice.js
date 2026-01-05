import { createSlice } from "@reduxjs/toolkit";
import { adminGetAllUsers } from "../../services/user/adminGetAllUsersApi";
import { adminDeleteUser } from "../../services/user/adminDeleteUserApi";

const initialState = {
  loading: false,
  users: [],
  error: null,
};

const adminGetAllUsersSlice = createSlice({
  name: "adminGetAllUsers",
  initialState,
  reducers: {
    resetAdminGetAllUsers: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET ALL USERS
      .addCase(adminGetAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(adminGetAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE USER (🔥 important part)
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      });
  },
});

export const { resetAdminGetAllUsers } = adminGetAllUsersSlice.actions;
export default adminGetAllUsersSlice.reducer;
