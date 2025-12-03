import React from "react";
import BarChart from "./BarChart.jsx";
import DashboardMyInfo from "./OngoingWork.jsx";
import MyPieChart from "./PieChart.jsx";
import Activity from "./Activity.jsx";
import CountDash from "./CountDash.jsx";

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Cards grid */}
      <div>
        <CountDash />
      </div>

      {/* Bar Chart below cards */}
      <div className="flex flex-row gap-6 mt-6">
        <div className=" top-[262px] left-[274px] w-[676px] h-[417px] bg-white rounded-[8px]  opacity-100 p-6 shadow-customShadow">
          <BarChart />
        </div>

        <div className=" w-[380px] h-[417px] top-[262px] left-[970px] rounded-[8px] rotate-0  shadow-customShadow bg-white opacity-100">
          <Activity />
        </div>
      </div>

      <div className="flex flex-row gap-6 mt-6">
        <div className="w-[676px] h-[301px] rounded-[8px] opacity-100 shadow-customShadow bg-white p-4">
          <DashboardMyInfo />
        </div>

        <div className="w-[380px] h-[301px] bg-white rounded-[8px] shadow-customShadow p-4">
          <MyPieChart />
        </div>
      </div>
    </div>
  );
}
