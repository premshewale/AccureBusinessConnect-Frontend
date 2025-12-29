import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/* ============================
   Create Department
============================ */
export const createDepartment = createAsyncThunk(
  "department/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.post(
        "/admin/departments",
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Create department failed"
      );
    }
  }
);

/* ============================
   Get All Departments
============================ */
export const getAllDepartments = createAsyncThunk(
  "department/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/admin/departments");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch departments failed"
      );
    }
  }
);
