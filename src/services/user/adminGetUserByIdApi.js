import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminGetUserById = createAsyncThunk(
  "adminGetUserById/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.get(`/users/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user details"
      );
    }
  }
);
