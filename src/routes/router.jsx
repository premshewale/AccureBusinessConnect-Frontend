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
import UserDetails from "../pages/admin/user/UserDetails.jsx";

import Leads from "../pages/admin/leads/Leads.jsx";
import LeadDetailsPage from "../pages/admin/leads/LeadDetailsPage.jsx";
import CreateLead from "../pages/admin/leads/CreateLead.jsx";

import Reports from "../pages/admin/reports/Reports.jsx";
import LeadsReports from "../pages/admin/reports/LeadsReports.jsx";
import CustomerReports from "../pages/admin/reports/CustomerReports.jsx";

import Customers from "../pages/admin/customers/Customers.jsx";
import CustomerDetails from "../pages/admin/customers/CustomerDetails.jsx";
import CreateCustomer from "../pages/admin/customers/CreateCustomer.jsx";

import Contacts from "../pages/admin/contacts/Contacts.jsx";
import ContactDetails from "../pages/admin/contacts/ContactDetails.jsx";
import CreateContact from "../pages/admin/contacts/CreateContact.jsx";

import Task from "../pages/admin/task/Task.jsx";
import CreateTask from "../pages/admin/task/CreateTask.jsx";
import TaskDetails from "../pages/admin/task/TaskDetails.jsx";

import Tickets from "../pages/admin/ticket/Ticket.jsx";
import CreateTicket from "../pages/admin/ticket/CreateTicket.jsx";
import TicketDetails from "../pages/admin/ticket/TicketDetails.jsx";

import Staff from "../pages/subadmin/staff/Staff.jsx";
import CreateStaff from "../pages/subadmin/staff/CreateStaff.jsx";

import RoleInterceptor from "../security/RoleInterceptor.jsx";
import Proposals from "../pages/admin/proposals/Proposals.jsx";
import CreateProposal from "../pages/admin/proposals/CreateProposal.jsx";
import ProposalDetails from "../pages/admin/proposals/ProposalDetails.jsx";

import UpdateDepartment from "../pages/admin/department/UpdateDepartment.jsx";
import Department from "../pages/admin/department/Department.jsx";
import Profile from "../pages/common/Profile.jsx";

import Expenses from "../pages/admin/expences/Expences.jsx";
import CreateExpense from "../pages/admin/expences/CreateExpense.jsx";
import ExpenseDetails from "../pages/admin/expences/ExpenseDetails.jsx";

import Payment from "../pages/admin/payment/Payment.jsx";
import CreatePayment from "../pages/admin/payment/CreatePayment.jsx";
import PaymentDetails from "../pages/admin/payment/PaymentDetails.jsx";

import Invoices from "../pages/admin/invoices/Invoices.jsx";
import InvoiceDetails from "../pages/admin/invoices/InvoiceDetails.jsx";
import CreateInvoice from "../pages/admin/invoices/CreateInvoice.jsx";

const router = createBrowserRouter([
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
        path: "departments/:id/edit", // plural "departments"
        element: (
          <RoleInterceptor allowedRoles={["ADMIN"]}>
            <UpdateDepartment />
          </RoleInterceptor>
        ),
      },

      {
        path: "users",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <Users />
          </RoleInterceptor>
        ),
      },
      {
        path: "users/:id",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <UserDetails />
          </RoleInterceptor>
        ),
      },

      {
        path: "create-user",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <CreateUser />
          </RoleInterceptor>
        ),
      },

      {
        path: "reports",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <Reports />
          </RoleInterceptor>
        ),
      },
      {
        path: "reports/leads",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <LeadsReports />
          </RoleInterceptor>
        ),
      },
      {
        path: "reports/customers",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <CustomerReports />
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
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Leads />
          </RoleInterceptor>
        ),
      },
      {
        path: "lead-details/:id",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <LeadDetailsPage />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-lead",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <CreateLead />
          </RoleInterceptor>
        ),
      },
      {
        path: "customers/:id",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <CustomerDetails />
          </RoleInterceptor>
        ),
      },
      {
        path: "customers",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Customers />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-customer",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
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
      {
        path: "invoices/:id",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <InvoiceDetails />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-invoice",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN"]}>
            <CreateInvoice />
          </RoleInterceptor>
        ),
      },

      // -------- All Roles (ADMIN, SUB_ADMIN, STAFF) --------

      // -------- Contacts --------
      {
        path: "customers/:customerId/contacts",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Contacts />
          </RoleInterceptor>
        ),
      },
      {
        path: "contacts/:id",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <ContactDetails />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-contact/:customerId",
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
        path: "create-task",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <CreateTask />
          </RoleInterceptor>
        ),
      },
      // -------- Tasks --------
      {
        path: "task/:id", // dynamic route for task details
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <TaskDetails />
          </RoleInterceptor>
        ),
      },

      {
        path: "proposals",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Proposals />
          </RoleInterceptor>
        ),
      },
      {
        path: "proposals/:id",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <ProposalDetails />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-proposal",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <CreateProposal />
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
        path: "edit-ticket/:id", // <-- new route
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <TicketDetails />
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
        path: "expenses",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Expenses />
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

      {
        path: "expenses/:id",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <ExpenseDetails />
          </RoleInterceptor>
        ),
      },

      // Payment

      // Payments
      {
        path: "payment",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <Payment />
          </RoleInterceptor>
        ),
      },
      {
        path: "payments/:id",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <PaymentDetails />
          </RoleInterceptor>
        ),
      },
      {
        path: "create-payment",
        element: (
          <RoleInterceptor allowedRoles={["ADMIN", "SUB_ADMIN", "STAFF"]}>
            <CreatePayment />
          </RoleInterceptor>
        ),
      },
    ],
  },
]);

export default router;
