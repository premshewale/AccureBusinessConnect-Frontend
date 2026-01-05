import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminDeleteUser = createAsyncThunk(
  "adminDeleteUser/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.delete(`/users/${id}`);
      return { id, message: res.data?.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User delete failed"
      );
    }
  }
);
