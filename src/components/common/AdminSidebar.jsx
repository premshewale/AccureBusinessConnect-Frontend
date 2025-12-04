import React from "react";
import { NavLink } from "react-router-dom";

import { LuLayoutDashboard, LuTickets } from "react-icons/lu";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaTasks, FaRegUserCircle } from "react-icons/fa";
import { LiaMoneyBillWaveSolid, LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlinePayments } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";

import { useSelector } from "react-redux";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  // GET LOGGED-IN USER ROLE
  const role = useSelector((state) => state.auth.user?.roleName);

  // Sidebar menu with allowedRoles
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard size={24} />,
      path: "/admin/dashboard",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Users",
      icon: <FaRegUserCircle size={24} />,
      path: "/admin/users",
      allowedRoles: ["ADMIN"],
    },
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
      name: "Contacts",
      icon: <RiContactsBook3Line size={24} />,
      path: "/admin/contacts",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Staff",
      icon: <SlPeople size={24} />,
      path: "/admin/staff",
      allowedRoles: ["ADMIN"],
    },
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
      name: "Invoices",
      icon: <LiaFileInvoiceSolid size={24} />,
      path: "/admin/invoices",
      allowedRoles: ["ADMIN", "SUB_ADMIN"],
    },
    {
      name: "Payment",
      icon: <MdOutlinePayments size={24} />,
      path: "/admin/payment",
      allowedRoles: ["ADMIN", "SUB_ADMIN", "STAFF"],
    },
    {
      name: "Reports",
      icon: <VscGraph size={24} />,
      path: "/admin/reports",
      allowedRoles: ["ADMIN"],
    },
  ];

  // Filter menu according to role
  const visibleMenu = menuItems.filter((item) =>
    item.allowedRoles.includes(role)
  );

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
