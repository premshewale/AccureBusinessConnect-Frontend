import React from "react";
import { LuUsers, LuTrendingUp, LuTarget } from "react-icons/lu";
import { FiUserCheck, FiUserMinus, FiDollarSign } from "react-icons/fi";
import { GoGraph } from "react-icons/go";

export default function LeadStats({ stats }) {
  const cards = [
    {
      title: "Total Leads",
      value: stats.total,
      icon: <LuUsers size={20} className="text-white" />,
      color: "bg-blue-500",
      trend: stats.totalChange || "+12%",
      description: "vs last month",
      bgColor: "bg-blue-50",
    },
    {
      title: "New Leads",
      value: stats.new,
      icon: <LuTrendingUp size={20} className="text-white" />,
      color: "bg-green-500",
      trend: stats.newChange || "+18%",
      description: "this month",
      bgColor: "bg-green-50",
    },
    {
      title: "Qualified",
      value: stats.qualified,
      icon: <FiUserCheck size={20} className="text-white" />,
      color: "bg-purple-500",
      trend: stats.qualifiedChange || "+8%",
      description: "ready",
      bgColor: "bg-purple-50",
    },
    {
      title: "Contacted",
      value: stats.contacted,
      icon: <LuTarget size={20} className="text-white" />,
      color: "bg-yellow-500",
      trend: stats.contactedChange || "+15%",
      description: "in progress",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Won",
      value: stats.won,
      icon: <FiUserCheck size={20} className="text-white" />,
      color: "bg-emerald-500",
      trend: stats.wonChange || "+10%",
      description: "successful",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Lost",
      value: stats.lost,
      icon: <FiUserMinus size={20} className="text-white" />,
      color: "bg-red-500",
      trend: stats.lostChange || "-5%",
      description: "follow-up",
      bgColor: "bg-red-50",
    },
    {
      title: "Conversion",
      value: `${stats.conversionRate || 0}%`,
      icon: <GoGraph size={18} className="text-white" />,
      color: "bg-amber-500",
      trend: stats.conversionChange || "+5%",
      description: "rate",
      bgColor: "bg-amber-50",
    },
    {
      title: "Est. Value",
      value: `₹${(stats.estimatedValue || 0).toLocaleString('en-IN')}`,
      icon: <FiDollarSign size={20} className="text-white" />,
      color: "bg-cyan",
      trend: stats.valueChange || "+22%",
      description: "revenue",
      bgColor: "bg-cyan-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} rounded-xl border p-3 hover:shadow-md transition-shadow min-h-[110px] flex flex-col justify-between`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-600 truncate">{card.title}</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{card.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${card.color} ml-2 flex-shrink-0`}>
              {card.icon}
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center">
              <span className={`text-xs font-semibold ${
                card.trend?.startsWith('+') ? 'text-green-600' : 
                card.trend?.startsWith('-') ? 'text-red-600' : 'text-gray-600'
              }`}>
                {card.trend}
              </span>
              <span className="text-xs text-gray-500 ml-1 truncate">{card.description}</span>
            </div>
            
            {/* Progress bar for count-based metrics (not for Conversion and Est. Value) */}
            {!card.title.includes("Conversion") && !card.title.includes("Est. Value") && (
              <div className="mt-2">
                <div className="w-full bg-white rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${card.color}`}
                    style={{ 
                      width: `${Math.min((card.value / (stats.total || 1)) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}