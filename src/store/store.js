import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/loginSlice";
import departmentReducer from "../slices/department/departmentSlice";
import adminCreateUserReducer from "../slices/user/adminCreateUserSlice";
import adminGetAllUsersReducer from "../slices/user/adminGetAllUsersSlice";
import adminCreateStaffReducer from "../slices/staff/adminCreateStaffSlice";


export default configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    adminCreateUser: adminCreateUserReducer,
    adminGetAllUsers: adminGetAllUsersReducer,
    adminCreateStaff: adminCreateStaffReducer,
  },
});
