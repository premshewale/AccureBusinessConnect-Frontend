import React, { useEffect } from "react";
import { LuUsers } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminGetDashboardCounts } from "../../../services/dashboard/adminGetDashboardCountsApi";

export default function Reports() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { counts, loading } = useSelector(
    (state) => state.dashboardCounts
  );

  useEffect(() => {
    dispatch(adminGetDashboardCounts());
  }, [dispatch]);

  const cards = [
    {
      title: "Total Leads",
      value: counts?.totalLeads ?? 0,
      icon: <LuUsers size={28} className="text-white" />,
      onClick: () => navigate("/admin/reports/leads"),
    },
    {
      title: "Total Customers",
      value: counts?.totalCustomers ?? 0,
      icon: <FiUserCheck size={28} className="text-white" />,
      onClick: () => navigate("/admin/reports/customers"),
    },
  ];

  if (loading) {
    return <p className="text-gray-500">Loading report stats...</p>;
  }

  return (
    <div className="flex flex-wrap gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={card.onClick}
          role="button"
          className="w-[261px] h-[116px] rounded-[8px] border bg-white shadow-md p-5
                     cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h3 className="text-[20px] font-medium mb-2 truncate">
            {card.title}
          </h3>

          <div className="flex justify-between items-center">
            <p className="text-4xl font-bold text-cyan">
              {card.value}
            </p>

            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
