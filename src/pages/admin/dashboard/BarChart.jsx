import React from "react";
import {
  BarChart as ReBarChart, // 👈 renamed Recharts component
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", users: 400, sales: 240 },
  { name: "Feb", users: 300, sales: 139 },
  { name: "Mar", users: 200, sales: 980 },
  { name: "Apr", users: 278, sales: 390 },
  { name: "May", users: 189, sales: 480 },
  { name: "Jun", users: 239, sales: 380 },
  { name: "July", users: 239, sales: 380 },
];

export default function BarChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ReBarChart  // 👈 use renamed Recharts BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#128B96" />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
