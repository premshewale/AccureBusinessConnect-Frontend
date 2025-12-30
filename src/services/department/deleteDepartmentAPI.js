import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/* ============================
   Delete Department
============================ */
export const deleteDepartment = createAsyncThunk(
  "department/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.delete(`/departments/${id}`);
      return { id }; // Return deleted department ID
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete department failed"
      );
    }
  }
);
