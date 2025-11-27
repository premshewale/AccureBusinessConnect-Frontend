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
    <div className="flex w-full h-72">
      {/* Left side legend */}
      <div className="flex flex-col justify-center mr-4">
        {data.map((entry, index) => (
          <div
            key={index}
            className={`flex items-center mb-2 cursor-pointer rounded p-1 transition
              ${activeIndex === index ? "bg-gray-100" : ""}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="w-4 h-4 mr-2 rounded"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span
              className={`font-Lato transition ${
                activeIndex === index ? "text-cyan font-semibold" : "text-cyanHover"
              }`}
            >
              {index + 1}. {entry.name}
            </span>
          </div>
        ))}
      </div>

      {/* Pie chart */}
      <div className="flex-1">
        <ResponsiveContainer>
          <RePieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  // Increase outer radius on hover
                  outerRadius={activeIndex === index ? 110 : 90}
                  cursor="pointer"
                />
              ))}
            </Pie>
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}




