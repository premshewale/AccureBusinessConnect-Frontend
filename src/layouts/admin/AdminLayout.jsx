// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import AdminSidebar from "../../components/common/AdminSidebar.jsx";
// import AdminHeader from "../../components/common/AdminHeader.jsx";
// import ScrollToTop from "../../components/common/ScrollToTop.jsx";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen overflow-hidden">

//       {/* Sidebar (fixed, no scroll) */}
//       <AdminSidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* Right Section */}
//       <div className="flex-1 flex flex-col overflow-hidden">

//         {/* Header (fixed, no scroll) */}
//         <AdminHeader
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />

//         {/* Main Content (ONLY THIS SCROLLS) */}
//         <main className="flex-1 bg-gray-50 overflow-y-auto">
//           <div className="max-w-7.5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
//             <ScrollToTop />
//             <Outlet />
//           </div>
//         </main>

//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/common/AdminSidebar.jsx";
import AdminHeader from "../../components/common/AdminHeader.jsx";
import ScrollToTop from "../../components/common/ScrollToTop.jsx";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="flex w-full h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Right Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Main Content (ONLY THIS SCROLLS) */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="w-full px-6 py-6">
              <ScrollToTop />
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
