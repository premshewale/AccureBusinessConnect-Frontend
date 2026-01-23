// import React, { useState } from "react";
// import {
//   PieChart as RePieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "New", value: 400 },
//   { name: "Contacted", value: 300 },
//   { name: "Proposal Sent", value: 100 },
//   { name: "Lost Leads", value: 100 },
// ];

// const COLORS = ["#128B96", "#BAF7FD", "#E0F8FD", "#EBF2f3"];

// export default function MyPieChart() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   return (
//     <div className="w-full">
//       {/* Title */}
//       <h2 className="font-Lato font-bold text-[30px] text-[#1A1A1A] mb-3">
//         Leads overview
//       </h2>

//       <div className="flex w-full h-72">
//         {/* Left side legend */}
//         <div className="flex flex-col justify-center mr-4">
//           {data.map((entry, index) => (
//             <div
//               key={index}
//               className={`flex items-center mb-2 cursor-pointer rounded p-1 transition
//               ${activeIndex === index ? "bg-gray-100" : ""}`}
//               onMouseEnter={() => setActiveIndex(index)}
//               onMouseLeave={() => setActiveIndex(null)}
//             >
//               <div
//                 className="w-4 h-4 mr-2 rounded"
//                 style={{ backgroundColor: COLORS[index % COLORS.length] }}
//               />
//               <span
//                 className={`font-Lato transition ${
//                   activeIndex === index
//                     ? "text-cyan font-semibold"
//                     : "text-cyanHover"
//                 }`}
//               >
//                 {index + 1}. {entry.name}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Pie chart */}
//         <div className="flex-1">
//           <ResponsiveContainer>
//             <RePieChart>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="35%"
//                 outerRadius={90}
//                 fill="#8884d8"
//                 label
//               >
//                 {data.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                     outerRadius={activeIndex === index ? 110 : 90}
//                     cursor="pointer"
//                   />
//                 ))}
//               </Pie>
//             </RePieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "New", value: 400 },
  { name: "Contacted", value: 300 },
  { name: "Proposal Sent", value: 100 },
  { name: "Lost Leads", value: 100 },
];

const COLORS = ["#128B96", "#BAF7FD", "#E0F8FD", "#EBF2f3"];

export default function MyPieChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="w-full">
      {/* Title (Laptop same, mobile small) */}
      <h2 className="font-Lato font-bold text-[18px] sm:text-[30px] text-[#1A1A1A] mb-2 sm:mb-3">
        Leads overview
      </h2>

      {/* Layout */}
      <div className="flex flex-col sm:flex-row w-full h-[260px] sm:h-72">
        {/* Legend */}
        <div className="flex flex-col justify-start sm:justify-center sm:mr-4">
          {data.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center mb-1 sm:mb-2 cursor-pointer rounded p-1 transition
              ${activeIndex === index ? "bg-gray-100" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 mr-2 rounded"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span
                className={`font-Lato transition text-[12px] sm:text-[16px]
                ${
                  activeIndex === index
                    ? "text-cyan font-semibold"
                    : "text-cyanHover"
                }`}
              >
                {index + 1}. {entry.name}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 w-full h-[170px] sm:h-full mt-2 sm:mt-0">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              {/* ✅ Mobile Pie */}
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%" // ✅ move up for mobile
                outerRadius={55} // ✅ smaller for mobile
                className="sm:hidden"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    cursor="pointer"
                  />
                ))}
              </Pie>

              {/* ✅ Laptop Pie SAME as before */}
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="35%"
                outerRadius={90}
                fill="#8884d8"
                label
                className="hidden sm:block"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-laptop-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    outerRadius={activeIndex === index ? 110 : 90}
                    cursor="pointer"
                  />
                ))}
              </Pie>
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

