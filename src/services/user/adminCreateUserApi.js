import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminCreateUser = createAsyncThunk(
  "adminCreateUser/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await adminApi.post("/users", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User creation failed"
      );
    }
  }
);
