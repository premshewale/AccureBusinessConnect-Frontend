import React from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";

export default function AdminSidebar() {
  return (
    <div className="h-screen bg-cyan shadow-xl p-5 flex flex-col w-[250px]">
      {/* Sidebar Title */}
      {/* <h2 className="text-2xl font-Lato-Bold mb-8 text-white">
        Accure Business <span className="text-center font-normal">connect</span>
      </h2> */}
      <h2 className="text-2xl font-Lato-Bold mb-8 text-white text-center leading-tight mt-[75px]">
        Accure Business <br />
        <span className="font-normal text-white">connect</span>
      </h2>

      {/* Menu */}
      <nav className="flex flex-col gap-4 text-gray-600">
        {/* Dashboard */}
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 p-2 rounded-lg 
             bg-cyan text-white font-lato font-normal 
             w-[201px] h-[44px] hover:bg-cyanHover transition-colors duration-200"
        >
          <LuLayoutDashboard size={24} />
          Dashboard
        </Link>

        {/* Leads */}

        <Link
          to="/admin/leads"
          className="flex items-center gap-3 p-2 rounded-lg 
             bg-cyan text-white font-lato font-normal 
             w-[201px] h-[44px] hover:bg-cyanHover transition-colors duration-200"
        >
          <FiUsers size={24} />
          Leads
        </Link>

        {/* Reports */}
        <Link
          to="/admin/reports"
          className="flex items-center gap-3 p-2 rounded-lg 
             bg-cyan text-white font-lato font-normal 
             w-[201px] h-[44px] hover:bg-cyanHover transition-colors duration-200"
        >
          <VscGraph size={24} />
          Reports
        </Link>
      </nav>
    </div>
  );
}
