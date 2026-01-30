import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/* ============================
   Update Department
============================ */
// updatedepartmentAPI.js
export const updateDepartment = createAsyncThunk(
  "department/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await adminApi.put(
        `/admin/departments/${id}`, // Remove the extra /api
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update department failed"
      );
    }
  }
);
