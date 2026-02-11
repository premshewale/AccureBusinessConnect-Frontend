import React from "react";
import { LuUsers, LuTrendingUp } from "react-icons/lu";
import { FiUserCheck, FiUserMinus } from "react-icons/fi";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaUserTag } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";

export default function ContactStats({ stats }) {
  const cards = [
    {
      title: "Total Contacts",
      value: stats.total || 0,
      icon: <LuUsers size={20} className="text-white" />,
      color: "bg-blue-500",
      trend: "+12%",
      description: "vs last month",
    },
    {
      title: "Active",
      value: stats.active || 0,
      icon: <FiUserCheck size={20} className="text-white" />,
      color: "bg-green-500",
      trend: "+8%",
      description: "available",
    },
    {
      title: "New",
      value: stats.new || 0,
      icon: <LuTrendingUp size={20} className="text-white" />,
      color: "bg-purple-500",
      trend: "+15%",
      description: "this month",
    },
    {
      title: "Primary",
      value: stats.primary || 0,
      icon: <FiUserMinus size={20} className="text-white" />,
      color: "bg-yellow-500",
      trend: "+5%",
      description: "key contacts",
    },
    {
      title: "With Email",
      value: stats.withEmail || 0,
      icon: <MdEmail size={18} className="text-white" />,
      color: "bg-amber-500",
      trend: "+18%",
      description: "contactable",
    },
    {
      title: "With Phone",
      value: stats.withPhone || 0,
      icon: <MdPhone size={18} className="text-white" />,
      color: "bg-cyan",
      trend: "+22%",
      description: "reachable",
    },
    {
      title: "Roles",
      value: stats.uniqueRoles || 0,
      icon: <FaUserTag size={18} className="text-white" />,
      color: "bg-indigo-500",
      trend: "+7%",
      description: "diversity",
    },
    {
      title: "Locations",
      value: stats.locations || 0,
      icon: <MdLocationOn size={18} className="text-white" />,
      color: "bg-emerald-500",
      trend: "+6%",
      description: "coverage",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1 truncate">{card.title}</p>
            </div>
            <div className={`p-2 rounded-lg ${card.color} flex-shrink-0 ml-1`}>
              {card.icon}
            </div>
          </div>
          
          <p className="text-xl font-bold text-gray-800 mb-2">{card.value}</p>
          
          <div className="mb-2">
            <p className="text-xs text-gray-500">
              <span className={`font-medium ${
                card.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.trend}
              </span> {card.description}
            </p>
          </div>
          
          {/* Progress bar - only for count-based metrics */}
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${card.color}`}
                style={{ 
                  width: `${Math.min((card.value / (Math.max(stats.total, 1))) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}