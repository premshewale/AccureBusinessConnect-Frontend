//Router

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
import Contacts from "../pages/admin/contacts/Contacts.jsx";
import Task from "../pages/admin/task/Task.jsx";
import Ticket from "../pages/admin/ticket/Ticket.jsx";
import Expences from "../pages/admin/expences/Expences.jsx";
import Invoices from "../pages/admin/invoices/Invoices.jsx";
import Payment from "../pages/admin/payment/Payment.jsx";
import CreateLead from "../pages/admin/leads/CreateLead.jsx";
import Staff from "../pages/admin/staff/Staff.jsx";
import CreateContact from "../pages/admin/contacts/CreateContact.jsx";

import RoleInterceptor from "../security/RoleInterceptor.jsx";

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <Navigate to="/admin/login" replace />, // Redirect root to login for consistency
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
      // { 
      //   index: true, // Handle /admin directly -> dashboard
      //   element: <Navigate to="dashboard" replace /> 
      // },
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
        path: "staff",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN"]}>
            <Staff />
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
        path: "customers",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <Customers />
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
            <Ticket />
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

      // Payment — all roles (added wrapper for consistency)
      {
        path: "payment",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Payment />
          </RoleInterceptor>
        ),
      },
    ],
  },
]);

export default router;