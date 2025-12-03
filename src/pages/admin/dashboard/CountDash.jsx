import React from "react";
import { LuUsers, LuFileCode } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { GoGraph } from "react-icons/go";

export default function CountDash() {
  // Static dummy values
  const stats = {
    totalUsers: 120,
    activeLeads: 45,
    newReports: 32,
    totalRevenue: 85000,
    percentageChange: 12,
  };

  const cards = [
    {
      title: "Total Leads",
      value: stats.totalUsers,
      icon: <LuUsers size={28} className="text-white" />,
    },
    {
      title: "Active Projects",
      value: stats.activeLeads,
      icon: <LuFileCode size={28} className="text-white" />,
    },
    {
      title: "Customers",
      value: stats.newReports,
      icon: <FiUserCheck size={28} className="text-white" />,
    },
    {
      title: "Monthly Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <GoGraph size={28} className="text-white" />,
    },
  ];

  return (
    <div className="flex flex-row gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="w-[261px] h-[116px] rounded-[8px] border-[0.5px] bg-white shadow-md p-5 border-cyan"
        >
          <h3 className="font-Lato text-[20px] mb-2 -mt-2">{card.title}</h3>

          <div className="flex justify-between items-center -mt-2">
            <p className="text-4xl font-bold text-cyan">{card.value}</p>

            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded">
              {card.icon}
            </div>
          </div>

          <p className="text-xs mt-1">
            <span className="text-cyan">+{stats.percentageChange}%</span> vs
            last month
          </p>
        </div>
      ))}
    </div>
  );
}
