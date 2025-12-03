import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/common/AdminSidebar.jsx";
import AdminHeader from "../../components/common/AdminHeader.jsx";
import ScrollToTop from "../../components/common/ScrollToTop.jsx";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <AdminHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            <ScrollToTop />
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
