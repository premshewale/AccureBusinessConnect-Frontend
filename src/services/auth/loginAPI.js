import {  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://backend.abc.techsofast.com/api";

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      const { accessToken, refreshToken, user } = response.data;

      // Determine role from roleName (e.g., "ADMIN" -> "admin")
      // const role = user.roleName.toLowerCase();
      const role = user.roleName; // DO NOT lowercase
const accessTokenKey = `${role}AccessToken`; // SUB_ADMINAccessToken

      // const accessTokenKey = `${role}AccessToken`;
      const refreshTokenKey = `${role}RefreshToken`;

      // Store tokens in localStorage with role-specific keys
      localStorage.setItem(accessTokenKey, accessToken);
      localStorage.setItem(refreshTokenKey, refreshToken);

      // Return user and role for state update
      return { user, role };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { role } = auth;

      if (role) {
        const accessTokenKey = `${role}AccessToken`;
        const refreshTokenKey = `${role}RefreshToken`;

        // Remove tokens from localStorage
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
      }

      return true;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

