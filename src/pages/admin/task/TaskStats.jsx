import React from "react";
import {
  FiList,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function TaskStats({ stats }) {
  if (!stats) return null;

  const cards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: <FiList size={24} className="text-white" />,
      color: "bg-blue-500",
      trend: "+8%",
      description: "vs last week",
    },
    {
      title: "To Do",
      value: stats.todo,
      icon: <FiClock size={24} className="text-white" />,
      color: "bg-yellow-500",
      trend: "+5%",
      description: "pending tasks",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <FiList size={24} className="text-white" />,
      color: "bg-cyan",
      trend: "+12%",
      description: "currently working",
    },
    {
      title: "Completed",
      value: stats.done,
      icon: <FiCheckCircle size={24} className="text-white" />,
      color: "bg-green-500",
      trend: "+18%",
      description: "tasks done",
    },
    {
      title: "Blocked",
      value: stats.blocked,
      icon: <FiAlertCircle size={24} className="text-white" />,
      color: "bg-red-500",
      trend: "-3%",
      description: "needs attention",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-800">
                {card.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <span
                  className={`font-medium ${
                    card.trend.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {card.trend}
                </span>{" "}
                {card.description}
              </p>
            </div>

            <div className={`p-3 rounded-lg ${card.color}`}>
              {card.icon}
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${card.color}`}
                style={{
                  width: `${Math.min(
                    ((typeof card.value === "number"
                      ? card.value
                      : 0) /
                      (stats.total || 1)) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
