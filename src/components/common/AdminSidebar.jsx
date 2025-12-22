import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { LuLayoutDashboard, LuTickets } from "react-icons/lu";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaTasks, FaRegUserCircle } from "react-icons/fa";
import { LiaMoneyBillWaveSolid, LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlinePayments } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { FiUsers, FiUserPlus } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";
import { MdAdd } from "react-icons/md"; // For generic add icons

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  // State for role (from localStorage)
  const [role, setRole] = useState(null);

  // Fetch role from localStorage on mount and when needed
  useEffect(() => {
    const possibleRoles = ["admin", "staff", "subadmin"];
    for (const lowercaseRole of possibleRoles) {
      const accessTokenKey = `${lowercaseRole}AccessToken`;
      const userKey = `${lowercaseRole}User`;
      const token = localStorage.getItem(accessTokenKey);
      const userStr = localStorage.getItem(userKey);

      if (token && userStr) {
        const user = JSON.parse(userStr);
        setRole(user.roleName?.toUpperCase());

        break; // Use first valid session
      }
    }
  }, []); // Run once on mount

  console.log("what is the role here ", role);

  // Sidebar menu with allowedRoles (added create items where applicable)
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard size={24} />,
      path: "/admin/dashboard",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    // -------- Admin Only --------
    {
      name: "Department",
      icon: <FaRegUserCircle size={24} />,
      path: "/admin/department",
      allowedRoles: ["ADMIN"],
    },
    {
      name: "Users",
      icon: <FaRegUserCircle size={24} />,
      path: "/admin/users",
      allowedRoles: ["ADMIN"],
    },

    {
      name: "Staff",
      icon: <SlPeople size={24} />,
      path: "/admin/staff",
      allowedRoles: ["ADMIN"],
    },
    {
      name: "Reports",
      icon: <VscGraph size={24} />,
      path: "/admin/reports",
      allowedRoles: ["ADMIN"],
    },
    // -------- Admin + SubAdmin --------
    {
      name: "Leads",
      icon: <AiOutlineFileAdd size={24} />,
      path: "/admin/leads",
      allowedRoles: ["ADMIN", "SUB_ADMIN"],
    },

    {
      name: "Customers",
      icon: <FiUsers size={24} />,
      path: "/admin/customers",
      allowedRoles: ["ADMIN", "SUB_ADMIN"],
    },
    {
      name: "Invoices",
      icon: <LiaFileInvoiceSolid size={24} />,
      path: "/admin/invoices",
      allowedRoles: ["ADMIN", "SUB_ADMIN"],
    },
    // -------- All Roles (ADMIN, SUB_ADMIN, STAFF) --------
    {
      name: "Contacts",
      icon: <RiContactsBook3Line size={24} />,
      path: "/admin/contacts",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    // {
    //   name: "Create Contact",
    //   icon: <MdAdd size={24} />,
    //   path: "/admin/create-contact",
    //   allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    // },
    {
      name: "Task",
      icon: <FaTasks size={24} />,
      path: "/admin/task",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Ticket",
      icon: <LuTickets size={24} />,
      path: "/admin/ticket",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Expences",
      icon: <LiaMoneyBillWaveSolid size={24} />,
      path: "/admin/expences",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Payment",
      icon: <MdOutlinePayments size={24} />,
      path: "/admin/payment",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
  ];

  // Filter menu according to role
  const visibleMenu = menuItems.filter(
    (item) => role && item.allowedRoles.includes(role)
  );

  // Show loading or empty if role not yet loaded
  if (!role) {
    return (
      <>
        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        {/* Sidebar with loading state */}
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-cyan shadow-xl z-50 transform transition-transform duration-300 md:translate-x-0 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:static md:block`}
        >
          <div className="h-screen p-5 flex flex-col w-[250px] overflow-y-auto  no-scrollbar">
            <h2 className="text-2xl font-Lato-Bold mb-8 text-white text-center mt-[75px] leading-tight">
              Accure Business <br />
              <span className="font-normal text-white">connect</span>
            </h2>
            <nav className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-2 rounded-lg w-[201px] h-[44px] bg-gray-600 text-white">
                Loading...
              </div>
            </nav>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-cyan shadow-xl z-50 transform transition-transform duration-300 md:translate-x-0 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:static md:block`}
      >
        <div className="h-screen p-5 flex flex-col w-[250px] overflow-y-auto">
          <h2 className="text-2xl font-Lato-Bold mb-8 text-white text-center mt-[75px] leading-tight">
            Accure Business <br />
            <span className="font-normal text-white">connect</span>
          </h2>

          <nav className="flex flex-col gap-2">
            {visibleMenu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg w-[201px] h-[44px] 
                  font-lato transition duration-200 
                  ${
                    isActive
                      ? "bg-[#1E1E1E66] text-white"
                      : "bg-cyan text-white hover:bg-cyanHover"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
