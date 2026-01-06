import React from "react";
import { FiFileText, FiSend, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { GoGraph } from "react-icons/go";

export default function ProposalStats({ stats }) {
  if (!stats) return null;

  const cards = [
    {
      title: "Total Proposals",
      value: stats.total,
      icon: <FiFileText size={24} className="text-white" />,
      color: "bg-blue-500",
      trend: "+10%",
      description: "vs last month",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FiFileText size={24} className="text-white" />,
      color: "bg-yellow-500",
      trend: "+6%",
      description: "awaiting action",
    },
    {
      title: "Sent",
      value: stats.sent,
      icon: <FiSend size={24} className="text-white" />,
      color: "bg-cyan",
      trend: "+12%",
      description: "this month",
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: <FiCheckCircle size={24} className="text-white" />,
      color: "bg-green-500",
      trend: "+18%",
      description: "success rate",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FiXCircle size={24} className="text-white" />,
      color: "bg-red-500",
      trend: "-4%",
      description: "needs review",
    },
    {
      title: "Total Proposal Value",
      value: `₹${(stats.totalValue || 0).toLocaleString("en-IN")}`,
      icon: <GoGraph size={22} className="text-white" />,
      color: "bg-amber-500",
      trend: "+14%",
      description: "estimated revenue",
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
                    ((typeof card.value === "number" ? card.value : 0) /
                      (stats.total || 1)) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}