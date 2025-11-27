import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/admin/dashboard/Dashboard.jsx";
import Login from "../pages/admin/auth/Login.jsx";
import AdminLayout from "../layouts/admin/AdminLayout.jsx";
import ErrorPage from "../components/common/ErrorPage.jsx";
import Leads from "../pages/admin/leads/Leads.jsx";
import Reports from "../pages/admin/reports/Reports.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },

  {
    // path: "/",
    element: <AdminLayout />, // Layout with Header + Footer
    errorElement: <ErrorPage />, // Custom error page
    children: [
      // { path: "/login", element: <Login /> },
    ],
  },
  // Admin login
  { path: "/admin/login", element: <Login /> },

  // Admin layout routes
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "reports", element: <Reports /> },
      { path: "leads", element: <Leads /> },
    ],
  },
]);
export default router;
