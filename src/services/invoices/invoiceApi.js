import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../store/adminApi";

// ===============================
// GET ALL INVOICES
// ===============================
export const getAllInvoices = createAsyncThunk(
  "invoices/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.get("/invoices");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invoices"
      );
    }
  }
);

// ===============================
// GET INVOICE BY ID
// ===============================
export const getInvoiceById = createAsyncThunk(
  "invoice/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.get(`/invoices/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invoice details"
      );
    }
  }
);

// ===============================
// CREATE INVOICE
// ===============================
export const createInvoice = createAsyncThunk(
  "invoice/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await adminApi.post("/invoices", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invoice creation failed"
      );
    }
  }
);

// ===============================
// UPDATE INVOICE
// ===============================
export const updateInvoice = createAsyncThunk(
  "invoice/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/invoices/${id}`, payload);
      return res.data; // must return updated invoice
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invoice update failed"
      );
    }
  }
);

// ===============================
// DELETE INVOICE
// ===============================
export const deleteInvoice = createAsyncThunk(
  "invoice/delete",
  async (id, { rejectWithValue }) => {
    try {
      await adminApi.delete(`/invoices/${id}`);
      return { id }; // 👈 IMPORTANT for slice filter
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invoice deletion failed"
      );
    }
  }
);

// ===============================
// UPDATE STATUS INVOICE
// ===============================

export const updateInvoiceStatus = createAsyncThunk(
  "invoice/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await adminApi.put(`/invoices/${id}/status`, { status });
      return res.data; // MUST return updated invoice
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update invoice status"
      );
    }
  }
);
