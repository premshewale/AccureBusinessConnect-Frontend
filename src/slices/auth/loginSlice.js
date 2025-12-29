import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/auth/loginAPI";
import { logoutUser } from "../../services/auth/logoutAPI";


const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false, // ✅ ADD THIS
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
initializeAuth: (state) => {
  const possibleRoles = ['ADMIN', 'SUB_ADMIN', 'STAFF']; // ✅ FIXED

  for (const role of possibleRoles) {
    const accessTokenKey = `${role}AccessToken`;
    const userKey = `${role}User`;

    const token = localStorage.getItem(accessTokenKey);
    const userStr = localStorage.getItem(userKey);

    if (token && userStr) {
      state.user = JSON.parse(userStr);
      state.role = role;
      state.isAuthenticated = true;
      state.isInitialized = true;
      return;
    }
  }

  state.isInitialized = true;
},
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, role } = action.payload;
        state.user = user;
        state.role = role;
        state.isAuthenticated = true;
        state.isLoading = false;
        // Store user for restoration
        localStorage.setItem(`${role}User`, JSON.stringify(user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Logout
.addCase(logoutUser.fulfilled, (state) => {
  state.user = null;
  state.role = null;
  state.isAuthenticated = false;
  state.error = null;
})
.addCase(logoutUser.rejected, (state, action) => {
  state.error = action.payload;
});

  },
});

export const { clearError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;