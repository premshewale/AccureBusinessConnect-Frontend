import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const { role } = getState().auth;

    if (role) {
      localStorage.removeItem(`${role}AccessToken`);
      localStorage.removeItem(`${role}RefreshToken`);
      localStorage.removeItem(`${role}User`);
    }

    return true;
  }
);
