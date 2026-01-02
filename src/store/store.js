import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/loginSlice";
import departmentReducer from "../slices/department/departmentSlice";
import adminCreateUserReducer from "../slices/user/adminCreateUserSlice";
import adminGetAllUsersReducer from "../slices/user/adminGetAllUsersSlice";
import adminCreateStaffReducer from "../slices/staff/adminCreateStaffSlice";
import adminCreateContactReducer from "../slices/contact/adminCreateContactSlice";
import adminGetContactsReducer from "../slices/contact/adminGetContactsSlice";
import profileReducer from "../slices/profile/profileSlice";
import adminCreateLeadReducer from "../slices/lead/adminCreateLeadSlice";
import adminGetAllLeadsReducer from "../slices/lead/adminGetAllLeadsSlice";
import adminGetLeadByIdReducer from "../slices/lead/adminGetLeadByIdSlice";
import adminUpdateLeadReducer from "../slices/lead/adminUpdateLeadSlice";
import adminDeleteLeadReducer from "../slices/lead/adminDeleteLeadSlice";
import adminConvertLeadReducer from "../slices/lead/adminConvertLeadSlice";
import adminUpdateUserReducer from "../slices/user/adminUpdateUserSlice";
import adminGetUserByIdReducer from "../slices/user/adminGetUserByIdSlice";






 





export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    department: departmentReducer,
    adminCreateUser: adminCreateUserReducer,
    adminGetAllUsers: adminGetAllUsersReducer,
    adminCreateStaff: adminCreateStaffReducer,
    adminCreateContact: adminCreateContactReducer,
    adminGetContacts: adminGetContactsReducer,
    adminCreateLead: adminCreateLeadReducer,
    adminGetAllLeads: adminGetAllLeadsReducer,
    adminGetLeadById: adminGetLeadByIdReducer,
    adminUpdateLead: adminUpdateLeadReducer,
    adminDeleteLead: adminDeleteLeadReducer,
    adminConvertLead: adminConvertLeadReducer,
    adminUpdateUser: adminUpdateUserReducer,
adminGetUserById: adminGetUserByIdReducer,









  },
});
