import React from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { LuTickets } from "react-icons/lu";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlinePayments } from "react-icons/md";
import { SlPeople } from "react-icons/sl";

import { FiUsers } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const linkClasses =
    "flex items-center gap-3 p-2 rounded-lg bg-cyan text-white font-lato font-normal w-[201px] h-[44px] hover:bg-cyanHover transition-colors duration-200";

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard size={24} />,
      path: "/admin/dashboard",
    },
    {
      name: "Leads",
      icon: <AiOutlineFileAdd size={24} />,
      path: "/admin/leads",
    },
    {
      name: "Customers",
      icon: <FiUsers size={24} />,
      path: "/admin/customers",
    },
    {
      name: "Contacts",
      icon: <RiContactsBook3Line size={24} />,
      path: "/admin/contacts",
    },
    {
      name: "Staff",
      icon: <SlPeople />,
      path: "/admin/staff",
    },
    { name: "Task", icon: <FaTasks size={24} />, path: "/admin/task" },
    { name: "Ticket", icon: <LuTickets size={24} />, path: "/admin/ticket" },
    {
      name: "Expences",
      icon: <LiaMoneyBillWaveSolid size={24} />,
      path: "/admin/expences",
    },
    {
      name: "Invoices",
      icon: <LiaFileInvoiceSolid size={24} />,
      path: "/admin/invoices",
    },
    {
      name: "Payment",
      icon: <MdOutlinePayments size={24} />,
      path: "/admin/payment",
    },
    { name: "Reports", icon: <VscGraph size={24} />, path: "/admin/reports" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-cyan shadow-xl  z-50
        transform transition-transform duration-300 md:translate-x-0 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:static md:block`}
      >
        <div className="h-screen bg-cyan shadow-xl p-5 flex flex-col w-[250px] overflow-y-auto">
          <h2 className="text-2xl font-Lato-Bold mb-8 text-white text-center leading-tight mt-[75px]">
            Accure Business <br />
            <span className="font-normal text-white">connect</span>
          </h2>

          <nav className="flex flex-col gap-2 text-gray-600">
            {menuItems.map((item) => (
              <NavLink
                to={item.path}
                onClick={() => setSidebarOpen(false)} // CLOSE SIDEBAR WHEN CLICKED
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg w-[201px] h-[44px] font-lato font-normal transition-colors duration-200 ${
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
