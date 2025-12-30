import { createSlice } from "@reduxjs/toolkit";
import {
  createDepartment,
  getAllDepartments,
} from "../../services/department/departmentAPI";
import { updateDepartment } from "../../services/department/updatedepartmentAPI";
import { deleteDepartment } from "../../services/department/deleteDepartmentAPI";

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
      /* CREATE */
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

      /* GET ALL */
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
      })

      /* UPDATE */
      .addCase(updateDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.departments = state.departments.map((dept) =>
          dept.id === action.payload.id ? action.payload : dept
        );
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.departments = state.departments.filter(
          (dept) => dept.id !== action.payload.id
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDepartmentState } = departmentSlice.actions;
export default departmentSlice.reducer;
