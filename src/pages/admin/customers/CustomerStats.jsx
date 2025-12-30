import React from "react";
import { LuUsers, LuTrendingUp, LuPackage } from "react-icons/lu";
import { FiUserCheck, FiUserMinus } from "react-icons/fi";
import { GoGraph } from "react-icons/go";

export default function CustomerStats({ stats }) {
  const cards = [
    {
      title: "Total Customers",
      value: stats.total,
      icon: <LuUsers size={24} className="text-white" />,
      color: "bg-blue-500",
      trend: "+12%",
      description: "vs last month",
    },
    {
      title: "Active Customers",
      value: stats.active,
      icon: <FiUserCheck size={24} className="text-white" />,
      color: "bg-green-500",
      trend: "+8%",
      description: "vs last month",
    },
    {
      title: "New Customers",
      value: stats.new,
      icon: <LuTrendingUp size={24} className="text-white" />,
      color: "bg-purple-500",
      trend: "+15%",
      description: "this month",
    },
    {
      title: "Prospects",
      value: stats.prospect,
      icon: <FiUserMinus size={24} className="text-white" />,
      color: "bg-yellow-500",
      trend: "+5%",
      description: "potential customers",
    },
    {
      title: "Total Value",
      value: `₹${stats.totalValue.toLocaleString('en-IN')}`,
      icon: <GoGraph size={20} className="text-white" />,
      color: "bg-amber-500",
      trend: "+18%",
      description: "revenue",
    },
    {
      title: "Avg. Value",
      value: `₹${Math.round(stats.avgValue).toLocaleString('en-IN')}`,
      icon: <LuPackage size={24} className="text-white" />,
      color: "bg-cyan",
      trend: "+5%",
      description: "per customer",
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