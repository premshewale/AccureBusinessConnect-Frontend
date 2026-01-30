import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { LuLayoutDashboard, LuTickets } from "react-icons/lu";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaTasks, FaRegUserCircle } from "react-icons/fa";
import { LiaMoneyBillWaveSolid, LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlinePayments } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const possibleRoles = ["ADMIN", "SUB_ADMIN", "STAFF"];

    for (const roleKey of possibleRoles) {
      const accessTokenKey = `${roleKey}AccessToken`;
      const userKey = `${roleKey}User`;

      const token = localStorage.getItem(accessTokenKey);
      const userStr = localStorage.getItem(userKey);

      if (token && userStr) {
        const user = JSON.parse(userStr);
        setRole(user.roleName);
        break;
      }
    }
  }, []);

  console.log("what is the role here ", role);

  // Dynamic base path for role
  const roleBasePath = role
    ? `/${role.toLowerCase().replace("_", "-")}`
    : "";

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard size={24} />,
      path: "/dashboard",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Department",
      icon: <HiOutlineBuildingOffice2 size={24} />,
      path: "/department",
      allowedRoles: ["ADMIN"],
    },
    {
      name: "Users",
      icon: <FaRegUserCircle size={24} />,
      path: "/users",
      allowedRoles: ["ADMIN", "SUB_ADMIN"],
    },
    {
      name: "Reports",
      icon: <VscGraph size={24} />,
      path: "/reports",
      allowedRoles: ["ADMIN", "SUB_ADMIN"],
    },
    {
      name: "Leads",
      icon: <AiOutlineFileAdd size={24} />,
      path: "/leads",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Customers",
      icon: <FiUsers size={24} />,
      path: "/customers",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Invoices",
      icon: <LiaFileInvoiceSolid size={24} />,
      path: "/invoices",
      allowedRoles: ["ADMIN", "SUB_ADMIN"],
    },
    {
      name: "Proposals",
      icon: <HiOutlineDocumentText size={24} />,
      path: "/proposals",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Task",
      icon: <FaTasks size={24} />,
      path: "/task",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Ticket",
      icon: <LuTickets size={24} />,
      path: "/ticket",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Expences",
      icon: <LiaMoneyBillWaveSolid size={24} />,
      path: "/expenses",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Payment",
      icon: <MdOutlinePayments size={24} />,
      path: "/payment",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
  ];

  const visibleMenu = menuItems.filter(
    (item) => role && item.allowedRoles.includes(role)
  );

  const sidebarBoxClass =
    "w-[250px] h-[1024px] bg-[#128B96] overflow-y-auto";

  // Loading UI if role not loaded
  if (!role) {
    return (
      <>
        <div
          className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`fixed top-0 left-0 ${sidebarBoxClass} shadow-xl z-50 transform transition-transform duration-300 
            md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:static md:block`}
        >
          <div className="p-5 flex flex-col w-[250px] h-[1024px] overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-Lato-Bold mb-8 text-white text-center mt-[75px] leading-tight">
              Accure Business <br />
              <span className="font-normal text-white">connect</span>
            </h2>

            <nav className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-2 rounded-lg w-[201px] h-[44px] bg-[#1E1E1E66] text-white">
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
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 ${sidebarBoxClass} shadow-xl z-50 transform transition-transform duration-300 
          md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:static md:block`}
      >
        <div className="p-5 flex flex-col w-[250px] h-screen overflow-y-auto no-scrollbar">
          <h2 className="text-2xl font-Lato-Bold mb-8 text-white text-center mt-[75px] leading-tight">
            Accure Business <br />
            <span className="font-normal text-white">connect</span>
          </h2>

          <nav className="flex flex-col gap-2">
            {visibleMenu.map((item) => (
              <NavLink
                key={item.path}
                to={`${roleBasePath}${item.path}`}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg w-[201px] h-[44px] 
                   font-lato transition duration-200 
                   ${
                     isActive
                       ? "bg-[#1E1E1E66] text-white"
                       : "bg-[#128B96] text-white hover:bg-[#0F7C85]"
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
