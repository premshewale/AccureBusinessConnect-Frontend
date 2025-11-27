import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";

export default function AdminHeader() {
  return (
    <div
      className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between  h-[75px] drop-shadow-md">
      {/* Right Side: Search Bar + Bell */}
      <div className="flex items-center gap-4 ml-8 ">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search leads contacts deals......"
            className="border border-gray-300 rounded-sm pl-10 pr-4 w-[541px] h-[40px] 
                       focus:outline-none focus:ring-2 focus:ring-blue-100
                       placeholder:text-[#919191]"
          />
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-[#919191]" />
        </div>
      </div>
      {/* Notification Bell */}
      <CiBellOn className="text-cyan text-2xl cursor-pointer w-[22px] h-[22px] mr-12		" />
    </div>
  );
}
