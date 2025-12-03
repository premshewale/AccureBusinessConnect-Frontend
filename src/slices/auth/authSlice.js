import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../api/auth/loginUser";


// =========== SLICE ===========
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Start
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Login Success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      // Login Failed
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
