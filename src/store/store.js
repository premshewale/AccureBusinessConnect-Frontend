import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/loginSlice";

import dashboardCountsReducer from "../slices/dashboard/dashboardCountsSlice";


import departmentReducer from "../slices/department/departmentSlice";
import adminCreateUserReducer from "../slices/user/adminCreateUserSlice";
import adminUpdateUserReducer from "../slices/user/adminUpdateUserSlice";
import adminGetUserByIdReducer from "../slices/user/adminGetUserByIdSlice";
import adminDeleteUserReducer from "../slices/user/adminDeleteUserSlice";
import adminGetAllUsersReducer from "../slices/user/adminGetAllUsersSlice";
import adminToggleUserStatusReducer from"../slices/user/adminToggleUserStatusSlice";


import adminCreateStaffReducer from "../slices/staff/adminCreateStaffSlice";
import adminCreateContactReducer from "../slices/contact/adminCreateContactSlice";
import adminGetContactsReducer from "../slices/contact/adminGetContactsSlice";
import adminGetContactByIdReducer from "../slices/contact/adminGetContactByIdSlice";
import adminUpdateContactReducer from "../slices/contact/adminUpdateContactSlice";
import adminAddContactToggleReducer from "../slices/contact/adminToggleContactStatusSlice";


import profileReducer from "../slices/profile/profileSlice";

import adminLeadsReportReducer from "../slices/reports/adminLeadsReportSlice";
import adminCustomersReportReducer from "../slices/reports/adminCustomersReportSlice";

import getAllInvoicesReducer from "../slices/invoices/invoiceSlice";


import adminCreateLeadReducer from "../slices/lead/adminCreateLeadSlice";
import adminGetAllLeadsReducer from "../slices/lead/adminGetAllLeadsSlice";
import adminGetLeadByIdReducer from "../slices/lead/adminGetLeadByIdSlice";
import adminUpdateLeadReducer from "../slices/lead/adminUpdateLeadSlice";
import adminDeleteLeadReducer from "../slices/lead/adminDeleteLeadSlice";
import adminConvertLeadReducer from "../slices/lead/adminConvertLeadSlice";
import adminUpdateLeadStatusReducer from "../slices/lead/adminUpdateLeadStatusSlice";
import adminToggleLeadStatusReducer from "../slices/lead/adminToggleLeadStatusSlice";



import adminGetAllCustomersReducer from "../slices/customers/adminGetAllCustomersSlice";
import adminCreateCustomerReducer from "../slices/customers/adminCreateCustomerSlice";
import adminGetCustomerByIdReducer from "../slices/customers/adminGetCustomerByIdSlice";
import adminUpdateCustomerReducer from "../slices/customers/adminUpdateCustomerSlice";
import adminDeleteCustomerReducer from "../slices/customers/adminDeleteCustomerSlice";



import ticketReducer from "../slices/ticket/ticketSlice";
import createTicketReducer from "../slices/ticket/createTicketSlice";
import getTicketByIdReducer from "../slices/ticket/getTicketByIdSlice";
import updateTicketReducer from "../slices/ticket/updateTicketSlice";


import adminGetAllPaymentsReducer from "../slices/payment/adminGetAllPaymentsSlice";
import adminCreatePaymentReducer from "../slices/payment/adminCreatePaymentSlice";
import adminGetPaymentByIdReducer from "../slices/payment/adminGetPaymentByIdSlice";


import adminGetAllProposalsReducer from "../slices/proposal/adminGetAllProposalsSlice";
import adminCreateProposalReducer from "../slices/proposal/adminCreateProposalSlice";
import adminGetProposalByIdReducer from "../slices/proposal/adminGetProposalByIdSlice";
import adminUpdateProposalReducer from "../slices/proposal/adminUpdateProposalSlice";


import adminGetAllExpensesReducer from "../slices/expenses/adminGetAllExpensesSlice";
import adminGetExpenseByIdReducer from "../slices/expenses/adminGetExpenseByIdSlice";
import adminUpdateExpenseReducer from "../slices/expenses/adminUpdateExpenseSlice";


import tasksReducer from "../slices/tasks/tasksSlice";





export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    department: departmentReducer,

    // dashboard
    dashboardCounts: dashboardCountsReducer,

    // User
    adminCreateUser: adminCreateUserReducer,
    adminGetAllUsers: adminGetAllUsersReducer,
    adminUpdateUser: adminUpdateUserReducer,
    adminGetUserById: adminGetUserByIdReducer,
    adminDeleteUser: adminDeleteUserReducer,
    adminToggleUserStatus: adminToggleUserStatusReducer,


    // staff
    adminCreateStaff: adminCreateStaffReducer,

    //reports
    adminLeadsReport: adminLeadsReportReducer,
    adminCustomersReport: adminCustomersReportReducer,



    // Customers
    adminGetAllCustomers: adminGetAllCustomersReducer,
    adminCreateCustomer: adminCreateCustomerReducer,
    adminGetCustomerById: adminGetCustomerByIdReducer,
    adminUpdateCustomer: adminUpdateCustomerReducer,
    adminDeleteCustomer: adminDeleteCustomerReducer,

    //Invoices
    invoices: getAllInvoicesReducer,




    // Contact
    adminCreateContact: adminCreateContactReducer,
    adminGetContacts: adminGetContactsReducer,
    adminGetContactById: adminGetContactByIdReducer,
    adminUpdateContact: adminUpdateContactReducer,
    adminAddContactToggle: adminAddContactToggleReducer,


    // Lead
    adminCreateLead: adminCreateLeadReducer,
    adminGetAllLeads: adminGetAllLeadsReducer,
    adminGetLeadById: adminGetLeadByIdReducer,
    adminUpdateLead: adminUpdateLeadReducer,
    adminDeleteLead: adminDeleteLeadReducer,
    adminConvertLead: adminConvertLeadReducer,
    adminUpdateLeadStatus: adminUpdateLeadStatusReducer,
    adminToggleLeadStatus: adminToggleLeadStatusReducer,


    // Ticket
    tickets: ticketReducer,
    createTicket: createTicketReducer,
    getTicketById: getTicketByIdReducer,
    updateTicket: updateTicketReducer,

    // Proposals
   adminGetAllProposals: adminGetAllProposalsReducer,
   adminCreateProposal: adminCreateProposalReducer,
   adminGetProposalById: adminGetProposalByIdReducer,
   adminUpdateProposal: adminUpdateProposalReducer,





    //Payments
    adminGetAllPayments: adminGetAllPaymentsReducer,
    adminCreatePayment: adminCreatePaymentReducer,
    adminGetPaymentById: adminGetPaymentByIdReducer,

    //expenses
    adminGetAllExpenses: adminGetAllExpensesReducer,
    adminGetExpenseById: adminGetExpenseByIdReducer,
    adminUpdateExpense: adminUpdateExpenseReducer,

  //tasks
    tasks: tasksReducer,


  },
});
