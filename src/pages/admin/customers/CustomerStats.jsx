import React from "react";
import { LuUsers, LuTrendingUp, LuDollarSign, LuPackage } from "react-icons/lu";
import { FiUserCheck, FiUserMinus } from "react-icons/fi";

export default function CustomerStats({ customers }) {
  // Calculate statistics
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    new: customers.filter(c => c.status === 'New').length,
    inactive: customers.filter(c => c.status === 'Inactive').length,
    totalValue: customers.reduce((sum, c) => sum + (c.totalValue || 0), 0),
    avgValue: customers.length > 0 
      ? customers.reduce((sum, c) => sum + (c.totalValue || 0), 0) / customers.length 
      : 0,
  };

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
      title: "New This Month",
      value: stats.new,
      icon: <LuTrendingUp size={24} className="text-white" />,
      color: "bg-purple-500",
      trend: "+15%",
      description: "new signups",
    },
    {
      title: "Total Value",
      value: `₹${stats.totalValue.toLocaleString('en-IN')}`,
      icon: <LuDollarSign size={24} className="text-white" />,
      color: "bg-amber-500",
      trend: "+18%",
      description: "revenue growth",
    },
    {
      title: "Average Value",
      value: `₹${Math.round(stats.avgValue).toLocaleString('en-IN')}`,
      icon: <LuPackage size={24} className="text-white" />,
      color: "bg-cyan",
      trend: "+5%",
      description: "per customer",
    },
    {
      title: "Inactive",
      value: stats.inactive,
      icon: <FiUserMinus size={24} className="text-white" />,
      color: "bg-gray-500",
      trend: "-3%",
      description: "vs last month",
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
                <span className="text-green-600 font-medium">{card.trend}</span> {card.description}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${card.color}`}>
              {card.icon}
            </div>
          </div>
          
          {/* Progress bar (optional) */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${card.color.replace('bg-', 'bg-').replace('500', '400')}`}
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}