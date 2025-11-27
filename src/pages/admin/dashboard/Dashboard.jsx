import React from "react";
import { LuUsers } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { LuFileCode } from "react-icons/lu";
import BarChart from "./BarChart.jsx";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import DashboardMyInfo from "./OngoingWork.jsx";
import MyPieChart from "./PieChart.jsx";



export default function Dashboard() {
  const stats = {
    totalUsers: 65,
    activeLeads: 65,
    newReports: 65,
    totalRevenue: 65,
    percentageChange: 12.5,
  };

  // Add your static sales performance
  const salesPerformance = 30;

  return (
    <div className="p-6">
      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="w-[261px] h-[116px] opacity-100 rounded-[8px] border-[0.5px] bg-white shadow-md p-5 border-cyan">
          <h3 className="font-Lato font-normal text-[20px] mb-2 text-xl">
            Total Leads
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-4xl font-bold text-cyan">{stats.totalUsers}</p>
            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded">
              <LuUsers size={28} className="text-white" />
            </div>
          </div>
          <p className="text-xs">
            <span className="text-cyan">{`+${stats.percentageChange}%`}</span>{" "}
            vs last month
          </p>
        </div>

        {/* Card 2 */}
        <div className="w-[261px] h-[116px] opacity-100 rounded-[8px] border-[0.5px] bg-white shadow-md p-5 border-cyan">
          <h3 className="font-Lato font-normal text-[20px] mb-2 text-xl">
            Active Projects
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-4xl font-bold text-cyan">{stats.activeLeads}</p>
            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded">
              <LuFileCode size={28} className="text-white" />
            </div>
          </div>
          <p className="text-xs">
            <span className="text-cyan">{`+${stats.percentageChange}%`}</span>{" "}
            vs last month
          </p>
        </div>

        {/* Card 3 */}
        <div className="w-[261px] h-[116px] opacity-100 rounded-[8px] border-[0.5px] bg-white shadow-md p-5 border-cyan">
          <h3 className="font-Lato font-normal text-[20px] mb-2 text-xl">
            Customers
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-4xl font-bold text-cyan">{stats.newReports}</p>
            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded">
              <FiUserCheck size={28} className="text-white" />
            </div>
          </div>
          <p className="text-xs">
            <span className="text-cyan">{`+${stats.percentageChange}%`}</span>{" "}
            vs last month
          </p>
        </div>

        {/* Card 4 */}
        <div className="w-[261px] h-[116px] opacity-100 rounded-[8px] border-[0.5px] bg-white shadow-md p-5 border-cyan">
          <h3 className="font-Lato font-normal text-[20px] mb-2 text-xl">
            Monthly Revenue
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-4xl font-bold text-cyan">
              ₹{stats.totalRevenue}
            </p>
            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded">
              <GoGraph size={28} className="text-white" />
            </div>
          </div>
          <p className="text-xs">
            <span className="text-cyan">{`+${stats.percentageChange}%`}</span>{" "}
            vs Monthly Revenue
          </p>
        </div>
      </div>

      {/* Bar Chart below cards */}
      <div className="flex flex-row gap-6 mt-6">
        <div className=" top-[262px] left-[274px] w-[676px] h-[417px] bg-white rounded-[8px] shadow-md opacity-100 p-6 shadow-customShadow">
          <h3 className="font-Lato mb-4 font-bold text-[22px] text-cyanHover">
            Revenue Trend
          </h3>
          <p className="text-xs text-fontgrey font-lato">
            Monthly revenue over the last 6 months
          </p>
          <BarChart />
          <p className="text-xs text-fontgrey font-lato">
            <span className="font-lato font-semibold	 text-[20px] leading-[100%] align-middle">
              {salesPerformance}%
            </span>{" "}
            Your sales performance is {salesPerformance}% better compared to
            last month
          </p>
        </div>

        <div className=" w-[380px] h-[417px] top-[262px] left-[970px] rounded-[8px] rotate-0 shadow-md shadow-customShadow bg-white opacity-100">
          <h3 className="font-Lato mb-4 font-bold text-[22px] text-cyanHover text-center">
            Recent Activity
          </h3>
          <div className="flex flex-row">
            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded-full">
              <IoCallOutline size={28} className="text-green" />
            </div>
            <div className="flex flex-col">
              Called Mr. Sangvi <span>2 minutes ago</span>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded-full">
              <MdOutlineMessage size={28} className="text-green" />
            </div>
            <div className="flex flex-col">
              Called Mr. Sangvi <span>2 minutes ago</span>
            </div>
          </div>
        </div>
      </div>

<div className="flex flex-row gap-6 mt-6">
  <div className="w-[676px] h-[301px] rounded-[8px] opacity-100 shadow-customShadow bg-white p-4">
    <DashboardMyInfo />
  </div>

  <div className="w-[380px] h-[301px] bg-white rounded-[8px] shadow-customShadow p-4">
    <MyPieChart  />
  </div>
</div>

    </div>
  );
}
