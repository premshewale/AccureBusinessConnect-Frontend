// import React from "react";
// import { LuUsers, LuFileCode } from "react-icons/lu";
// import { FiUserCheck } from "react-icons/fi";
// import { GoGraph } from "react-icons/go";

// export default function CountDash() {
//   // Static dummy values
//   const stats = {
//     totalUsers: 120,
//     activeLeads: 45,
//     newReports: 32,
//     totalRevenue: 85000,
//     percentageChange: 12,
//   };

//   const cards = [
//     {
//       title: "Total Leads",
//       value: stats.totalUsers,
//       icon: <LuUsers size={28} className="text-white" />,
//     },
//     {
//       title: "Active Projects",
//       value: stats.activeLeads,
//       icon: <LuFileCode size={28} className="text-white" />,
//     },
//     {
//       title: "Customers",
//       value: stats.newReports,
//       icon: <FiUserCheck size={28} className="text-white" />,
//     },
//     {
//       title: "Monthly Revenue",
//       value: `₹${stats.totalRevenue}`,
//       icon: <GoGraph size={28} className="text-white" />,
//     },
//   ];

//   return (
//     <div className="flex flex-row gap-5">
//       {cards.map((card, index) => (
//         <div
//           key={index}
//           className="w-[261px] h-[116px] rounded-[8px] border-[0.5px] bg-white shadow-md p-5 border-cyan"
//         >
//           <h3 className="font-Lato text-[20px] mb-2 -mt-2">{card.title}</h3>

//           <div className="flex justify-between items-center -mt-2">
//             <p className="text-4xl font-bold text-cyan">{card.value}</p>

//             <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded">
//               {card.icon}
//             </div>
//           </div>

//           <p className="text-xs mt-1">
//             <span className="text-cyan">+{stats.percentageChange}%</span> vs
//             last month
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";
import { LuUsers, LuFileCode } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { GoGraph } from "react-icons/go";

export default function CountDash() {
  const stats = {
    totalUsers: 120,
    activeLeads: 45,
    newReports: 32,
    totalRevenue: 85000,
    percentageChange: 12,
  };

  const cards = [
    { title: "Total Leads", value: stats.totalUsers, icon: <LuUsers /> },
    { title: "Active Projects", value: stats.activeLeads, icon: <LuFileCode /> },
    { title: "Customers", value: stats.newReports, icon: <FiUserCheck /> },
    { title: "Monthly Revenue", value: `₹${stats.totalRevenue}`, icon: <GoGraph /> },
  ];

  return (
    <div className="w-full">
      {/* ✅ MOBILE = 4 cards in one row */}
      <div className="grid grid-cols-4 gap-[6px] sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-cyan rounded-[8px] shadow-sm
                       p-[6px] sm:p-5"
          >
            {/* ✅ TITLE (small + truncate for mobile) */}
            <h3 className="font-Lato text-[8px] sm:text-[18px] lg:text-[20px] font-medium truncate">
              {card.title}
            </h3>

            {/* ✅ VALUE + ICON in same row */}
            <div className="flex items-center justify-between mt-[4px] sm:mt-2">
              <p className="text-[11px] sm:text-[32px] lg:text-[36px] font-bold text-cyan leading-none truncate">
                {card.value}
              </p>

              {/* ✅ ICON box fixed size */}
              <div className="h-[18px] w-[18px] sm:h-[48px] sm:w-[48px] bg-cyan rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] sm:text-[22px]">
                  {card.icon}
                </span>
              </div>
            </div>

            {/* ✅ hide footer only in mobile */}
            <p className="hidden sm:block text-[12px] mt-2">
              <span className="text-cyan">+{stats.percentageChange}%</span> vs last
              month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


