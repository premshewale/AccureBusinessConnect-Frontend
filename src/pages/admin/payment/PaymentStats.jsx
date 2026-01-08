import React from "react";
import { 
  FiDollarSign, 
  FiCheckCircle, 
  FiClock, 
  FiAlertCircle,
  FiTrendingUp,
  FiUsers
} from "react-icons/fi";

export default function PaymentStats({ stats }) {
  const cards = [
    {
      title: "Total Payments",
      value: stats.total,
      icon: <FiDollarSign size={24} className="text-white" />,
      color: "bg-blue-500",
      trend: "+18%",
      description: "vs last month",
    },
    {
      title: "Amount Collected",
      value: `₹${stats.totalPaid.toLocaleString('en-IN')}`,
      icon: <FiCheckCircle size={24} className="text-white" />,
      color: "bg-green-500",
      trend: "+22%",
      description: "total received",
    },
    {
      title: "Pending Amount",
      value: `₹${stats.totalDue.toLocaleString('en-IN')}`,
      icon: <FiClock size={24} className="text-white" />,
      color: "bg-yellow-500",
      trend: "-8%",
      description: "to be collected",
    },
    {
      title: "Collection Rate",
      value: `${stats.collectionRate}%`,
      icon: <FiTrendingUp size={24} className="text-white" />,
      color: "bg-purple-500",
      trend: "+5%",
      description: "efficiency",
    },
    {
      title: "Overdue Payments",
      value: stats.overdue,
      icon: <FiAlertCircle size={24} className="text-white" />,
      color: "bg-red-500",
      trend: "-3%",
      description: "need attention",
    },
    {
      title: "Avg. Payment",
      value: `₹${stats.avgPayment.toLocaleString('en-IN')}`,
      icon: <FiUsers size={24} className="text-white" />,
      color: "bg-cyan",
      trend: "+12%",
      description: "per transaction",
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