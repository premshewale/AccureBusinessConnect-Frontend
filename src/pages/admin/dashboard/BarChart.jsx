// import React from "react";
// import {
//   BarChart as ReBarChart, // 👈 renamed Recharts component
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

//   // Add your static sales performance
//   const salesPerformance = 30;

// const data = [
//   { name: "Jan", users: 400, sales: 240 },
//   { name: "Feb", users: 300, sales: 139 },
//   { name: "Mar", users: 200, sales: 980 },
//   { name: "Apr", users: 278, sales: 390 },
//   { name: "May", users: 189, sales: 480 },
//   { name: "Jun", users: 239, sales: 380 },
//   { name: "July", users: 239, sales: 380 },
// ];

// export default function BarChart() {
//   return (
//     <div>
//       <h3 className="font-Lato mb-4 font-bold text-[22px] text-cyanHover">
//         Revenue Trend
//       </h3>
//       <p className="text-xs text-fontgrey font-lato">
//         Monthly revenue over the last 6 months
//       </p>

//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <ReBarChart // 👈 use renamed Recharts BarChart
//             data={data}
//             margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//           >
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="users" fill="#128B96" />
//           </ReBarChart>
//         </ResponsiveContainer>
//       </div>
//       <p className="text-xs text-fontgrey font-lato">
//         <span className="font-lato font-semibold	 text-[20px] leading-[100%] align-middle">
//           {salesPerformance}%
//         </span>{" "}
//         Your sales performance is {salesPerformance}% better compared to last
//         month
//       </p>
//     </div>
//   );
// }



import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const salesPerformance = 30;

const data = [
  { name: "Jan", value: 60, tooltip: "60: Good sales in Jan" },
  { name: "Feb", value: 45, tooltip: "45: Low sales in Feb" },
  { name: "Mar", value: 30, tooltip: "30: Low sales in Mar" },
  { name: "Apr", value: 50, tooltip: "50: Good sales in Apr" },
  { name: "May", value: 40, tooltip: "40: Average sales in May" },
  { name: "Jun", value: 55, tooltip: "55: Good sales in Jun" },
  { name: "Jul", value: 25, tooltip: "25: Low sales in Jul" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-md border border-[#EAEAEA]">
        <p className="text-[12px] text-[#3B3B3B] font-Lato">
          {payload[0].payload.tooltip}
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueTrendChart() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Title */}
      <h3 className="font-Lato font-bold text-[22px] text-[#1A1A1A] leading-tight">
        Revenue Trend
      </h3>

      {/* Subtitle */}
      <p className="text-[12px] text-[#9A9A9A] font-Lato mt-1">
        Monthly revenue over the last 6 months
      </p>

      {/* Chart */}
      <div className="flex-1 w-full mt-4 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: -45,   // ✅ move chart to LEFT
              bottom: 0,
            }}
          >
            {/* X Axis */}
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: "#BDBDBD" }}
              tick={{ fontSize: 12, fill: "#3B3B3B" }}
            />

            {/* Y Axis only border line (no ticks) */}
            <YAxis
              tick={false}
              tickLine={false}
              axisLine={{ stroke: "#BDBDBD" }}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} cursor={false} />

            {/* Background Bars */}
            <Bar
              dataKey="value"
              barSize={48}
              radius={[6, 6, 6, 6]}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "Jun" ? "#7DBBC1" : "#EAF6F7"}
                />
              ))}
            </Bar>

            {/* Smooth Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#128B96"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Text */}
      <div className="mt-3 flex items-center gap-2">
        <span className="font-Lato font-semibold text-[14px] text-[#1A1A1A]">
          {salesPerformance}%
        </span>

        <p className="text-[11px] text-[#9A9A9A] font-Lato">
          Your sales performance is {salesPerformance}% better compare to last
          month
        </p>
      </div>
    </div>
  );
}
