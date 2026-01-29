import React, { useEffect } from "react";
import { LuUsers, LuFileCode } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { adminGetDashboardCounts } from "../../../services/dashboard/adminGetDashboardCountsApi";

export default function CountDash() {
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
      value: counts.totalLeads,
      icon: <LuUsers />,
    },
    {
      title: "Customers",
      value: counts.totalCustomers,
      icon: <FiUserCheck />,
    },
    {
      title: "Invoices",
      value: counts.totalInvoices,
      icon: <LuFileCode />,
    },
    {
      title: "Tasks",
      value: counts.totalTasks,
      icon: <GoGraph />,
    },
  ];

  if (loading) {
    return <p className="text-gray-500">Loading dashboard stats...</p>;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-[6px] sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-cyan rounded-[8px] shadow-sm p-[6px] sm:p-5"
          >
            <h3 className="font-Lato text-[8px] sm:text-[18px] lg:text-[20px] font-medium truncate">
              {card.title}
            </h3>

            <div className="flex items-center justify-between mt-[4px] sm:mt-2">
              <p className="text-[11px] sm:text-[32px] lg:text-[36px] font-bold text-cyan leading-none truncate">
                {card.value}
              </p>

              <div className="h-[18px] w-[18px] sm:h-[48px] sm:w-[48px] bg-cyan rounded flex items-center justify-center">
                <span className="text-white text-[10px] sm:text-[22px]">
                  {card.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
