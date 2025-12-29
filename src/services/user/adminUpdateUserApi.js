import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminUpdateUser = createAsyncThunk(
  "adminUpdateUser/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/users/${id}`, payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User update failed"
      );
    }
  }
);
