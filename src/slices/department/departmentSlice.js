import { createSlice } from "@reduxjs/toolkit";
import {
  createDepartment,
  getAllDepartments,
} from "../../services/department/departmentAPI";

const initialState = {
  departments: [],
  isLoading: false,
  error: null,
  success: false,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    clearDepartmentState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.departments.push(action.payload);
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllDepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = action.payload;
      })
      .addCase(getAllDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDepartmentState } = departmentSlice.actions;
export default departmentSlice.reducer;
