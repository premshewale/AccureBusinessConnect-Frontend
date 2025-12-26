import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

export const adminGetAllUsers = createAsyncThunk(
  "adminGetAllUsers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/users");

      // 🔍 FULL RESPONSE
      console.log("GET /api/users → full response:", res);

      // 🔍 ONLY DATA
      console.log("GET /api/users → response.data:", res.data);

      // 🔍 FIRST USER (structure check)
      console.log("GET /api/users → first user:", res.data?.[5]);

      return res.data;
    } catch (error) {
      console.error(
        "GET /api/users → error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

