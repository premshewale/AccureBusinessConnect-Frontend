import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

/**
 * GET ALL CUSTOMERS (Paged + Search)
 * GET /api/customers?page=&size=&search=
 */
export const adminGetAllCustomers = createAsyncThunk(
  "customers/getAll",
  async ({ page = 0, size = 10, search = "" }, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/customers", {
        params: { page, size, search },
      });

      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch customers");
    }
  }
);
