import React from "react";
import { LuTicket } from "react-icons/lu";
import { FiClock, FiCheckCircle, FiAlertCircle, FiUsers } from "react-icons/fi";
import { GoIssueOpened } from "react-icons/go";
import { MdOutlinePriorityHigh } from "react-icons/md";

export default function TicketStats({ stats }) {
  const cards = [
    {
      title: "Total Tickets",
      value: stats.total,
      icon: <LuTicket size={24} className="text-white" />,
      color: "bg-blue-500",
      trend: "+12%",
      description: "vs last week",
    },
    {
      title: "Open Tickets",
      value: stats.open,
      icon: <GoIssueOpened size={24} className="text-white" />,
      color: "bg-amber-500",
      trend: "-3%",
      description: "vs last week",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <FiClock size={24} className="text-white" />,
      color: "bg-purple-500",
      trend: "+8%",
      description: "active tickets",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: <FiCheckCircle size={24} className="text-white" />,
      color: "bg-green-500",
      trend: "+15%",
      description: "this week",
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      icon: <MdOutlinePriorityHigh size={24} className="text-white" />,
      color: "bg-red-500",
      trend: "+5%",
      description: "urgent tickets",
    },
    {
      title: "Avg. Resolution",
      value: `${stats.avgResolutionTime}h`,
      icon: <FiAlertCircle size={24} className="text-white" />,
      color: "bg-cyan",
      trend: "-10%",
      description: "faster than last month",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-xs text-gray-500 mt-1">
                <span className={`font-medium ${
                  card.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {card.trend}
                </span> {card.description}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${card.color}`}>
              {card.icon}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${card.color}`}
                style={{ 
                  width: `${Math.min((card.value / (stats.total || 1)) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}