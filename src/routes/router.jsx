import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/admin/auth/Login.jsx";
import ForgotPassword from "../pages/admin/auth/ForgotPassword.jsx";
import ResetPassword from "../pages/admin/auth/ResetPassword.jsx";
import Unauthorized from "../pages/admin/auth/Unauthorized.jsx";

import Dashboard from "../pages/admin/dashboard/Dashboard.jsx";
import AdminLayout from "../layouts/admin/AdminLayout.jsx";

import ErrorPage from "../components/common/ErrorPage.jsx";

import CreateUser from "../pages/admin/user/CreateUser.jsx";
import Users from "../pages/admin/user/Users.jsx";
import Leads from "../pages/admin/leads/Leads.jsx";
import Reports from "../pages/admin/reports/Reports.jsx";
import Customers from "../pages/admin/customers/Customers.jsx";
import CreateCustomer from "../pages/admin/customers/CreateCustomer.jsx";
import Contacts from "../pages/admin/contacts/Contacts.jsx";
import Task from "../pages/admin/task/Task.jsx";
import Tickets from "../pages/admin/ticket/Ticket.jsx";
import CreateTicket from "../pages/admin/ticket/CreateTicket.jsx";
import Expences from "../pages/admin/expences/Expences.jsx";
import Invoices from "../pages/admin/invoices/Invoices.jsx";
import Payment from "../pages/admin/payment/Payment.jsx";
import CreateLead from "../pages/admin/leads/CreateLead.jsx";
import Staff from "../pages/subadmin/staff/Staff.jsx";
import CreateStaff from "../pages/subadmin/staff/CreateStaff.jsx";
import CreateContact from "../pages/admin/contacts/CreateContact.jsx";

import RoleInterceptor from "../security/RoleInterceptor.jsx";

import Department from "../pages/admin/department/Department.jsx";
import Profile from "../pages/common/Profile.jsx";
import LeadDetailsPage from "../pages/admin/leads/Leads.jsx";
import CreateExpense from "../pages/admin/expences/CreateExpense.jsx";
import CreatePayment from "../pages/admin/payment/CreatePayment.jsx";
import UserDetial from "../pages/admin/user/UserDetails.jsx";


const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <Navigate to="/admin/login" replace />,
    errorElement: <ErrorPage />,
  },
  { path: "/admin/login", element: <Login /> },
  { path: "/admin/forgot-password", element: <ForgotPassword /> },
  { path: "/admin/reset-password", element: <ResetPassword /> },
  { path: "/unauthorized", element: <Unauthorized /> },

  // Protected Admin Layout
  {
    path: "/admin",
    element: (
      <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
        <AdminLayout />
      </RoleInterceptor>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "dashboard", element: <Dashboard /> },

      // -------- Admin Only --------
      {
        path: "users",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN"]}>
            <Users />
          </RoleInterceptor>
        ),
      },
      {
        path: "users/:id", // ✅ User Details / Edit
        element: (
          <RoleInterceptor allowedRoles={["ADMIN"]}>
            <UserDetial/>
          </RoleInterceptor>
        ),
      },
      
      {
        path: "create-user",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN"]}>
            <CreateUser />
          </RoleInterceptor>
        ),
      },

      {
        path: "reports",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN"]}>
            <Reports />
          </RoleInterceptor>
        ),
      },
      {
        path: "department",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN"]}>
            <Department />
          </RoleInterceptor>
        ),
      },

      // -------- SubAdmin Only --------
      {
        path: "staff",
        element: (
          <RoleInterceptor allowedRoles={["SUB_ADMIN"]}>
            <Staff />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-staff",
        element: (
          <RoleInterceptor allowedRoles={["SUB_ADMIN"]}>
            <CreateStaff />
          </RoleInterceptor>
        ),
      },

      // -------- Admin + SubAdmin --------
      {
        path: "leads",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <Leads />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-lead",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <CreateLead />
          </RoleInterceptor>
        ),
      },
      {
        path: "lead-details/:id",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <LeadDetailsPage />
          </RoleInterceptor>
        ),
      },
      {
        path: "customers",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <Customers />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-customer",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <CreateCustomer />
          </RoleInterceptor>
        ),
      },
      {
        path: "invoices",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <Invoices />
          </RoleInterceptor>
        ),
      },

      // -------- All Roles (ADMIN, SUB_ADMIN, STAFF) --------
      {
        path: "contacts",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Contacts />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-contact",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <CreateContact />
          </RoleInterceptor>
        ),
      },
      {
        path: "task",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Task />
          </RoleInterceptor>
        ),
      },
      {
        path: "ticket",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Tickets />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-ticket",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <CreateTicket />
          </RoleInterceptor>
        ),
      },
      {
        path: "expences",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Expences />
          </RoleInterceptor>
        ),
      },
      {
        path: "profile",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Profile />
          </RoleInterceptor>
        ),
      },

      {
      path: "create-expense",
      element: (
        <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
          <CreateExpense />
        </RoleInterceptor>
      ),
    },

      // Payment

       {
  path: "payment", 
  element: (
    <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
      <Payment />
    </RoleInterceptor>
  ),
},
      {
        path: "create-payment",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <CreatePayment/>
          </RoleInterceptor>
        ),
      },
    ],
  },
 
]);

export default router;
