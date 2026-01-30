import {  createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://backend.abc.techsofast.com/api";

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      const { accessToken, refreshToken, user } = response.data;
      console.log("Login response user object:", user); 


      const role = user.roleName; 
const accessTokenKey = `${role}AccessToken`;

      const refreshTokenKey = `${role}RefreshToken`;
      localStorage.setItem("Role", role);
      localStorage.setItem(accessTokenKey, accessToken);
      localStorage.setItem(refreshTokenKey, refreshToken);

      return { user, role };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { role } = auth;

      if (role) {
        const accessTokenKey = `${role}AccessToken`;
        const refreshTokenKey = `${role}RefreshToken`;

        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
      }

      return true;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

