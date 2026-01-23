import React from "react";
import { LuUsers } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();

  const stats = {
    totalLeads: 120,
    totalCustomers: 32,
  };

  const cards = [
  {
    title: "Total Leads",
    value: stats.totalLeads,
    icon: <LuUsers size={28} className="text-white" />,
    onClick: () => navigate("/admin/reports/leads"),
  },
  {
    title: "Total Customers",
    value: stats.totalCustomers,
    icon: <FiUserCheck size={28} className="text-white" />,
    onClick: () => navigate("/admin/reports/customers"),
  },
];


  return (
    <div className="flex flex-wrap gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={card.onClick}
          role={card.onClick ? "button" : undefined}
          className={`w-[261px] h-[116px] rounded-[8px] border bg-white shadow-md p-5 
            ${card.onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`}
        >
          <h3 className="text-[20px] font-medium mb-2">{card.title}</h3>

          <div className="flex justify-between items-center">
            <p className="text-4xl font-bold text-cyan">{card.value}</p>

            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
