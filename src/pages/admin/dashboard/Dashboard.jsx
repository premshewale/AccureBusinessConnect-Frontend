import React, { useEffect, useState } from "react";
import BarChart from "./BarChart.jsx";
import DashboardMyInfo from "./OngoingWork.jsx";
import MyPieChart from "./PieChart.jsx";
import Activity from "./Activity.jsx";
import CountDash from "./CountDash.jsx";

export default function Dashboard() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const possibleRoles = ["admin", "staff", "subadmin"];

    for (const lowercaseRole of possibleRoles) {
      const token = localStorage.getItem(`${lowercaseRole}AccessToken`);
      const userStr = localStorage.getItem(`${lowercaseRole}User`);

      if (token && userStr) {
        const user = JSON.parse(userStr);
        setRole(user.roleName?.toUpperCase());
        break;
      }
    }
  }, []);

  useEffect(() => {
    console.log("📊 Role on Dashboard (from localStorage):", role);
  }, [role]);

  return (
    <div className="p-6">
      <CountDash />

      {/* Row 1 */}
    {/* Row 1 */}
<div className="grid grid-cols-1 lg:grid-cols-[676px_380px] gap-6 mt-6">
  {/* BarChart Card (same as before) */}
  <div className="w-full lg:w-[676px] h-[417px] bg-white rounded-[8px] p-6 shadow-customShadow">
    <BarChart />
  </div>

  {/* Activity Card (dimension only here) */}
  <div className="w-full lg:w-[380px] lg:h-[417px] rounded-[8px] shadow-customShadow bg-white">
    <Activity />
  </div>
</div>


<div className="grid grid-cols-1 lg:grid-cols-[676px_380px] gap-4 lg:gap-6 mt-6">
  <div className="w-full lg:w-[676px] h-[301px] rounded-[8px] shadow-customShadow bg-white p-3 lg:p-4">
    <DashboardMyInfo />
  </div>

  <div className="w-full lg:w-[380px] h-[301px] bg-white rounded-[8px] shadow-customShadow p-3 lg:p-4">
    <MyPieChart />
  </div>
</div>

  );
}


// import React from "react";
// import BarChart from "./BarChart.jsx";
// import DashboardMyInfo from "./OngoingWork.jsx";
// import MyPieChart from "./PieChart.jsx";
// import Activity from "./Activity.jsx";
// import CountDash from "./CountDash.jsx";


// export default function Dashboard() {


//   return (
//     <div className="p-6">
//       <div>
//         <CountDash />
//       </div>

//       <div className="flex flex-row gap-6 mt-6">
//         <div className=" top-[262px] left-[274px] w-[676px] h-[417px] bg-white rounded-[8px]  opacity-100 p-6 shadow-customShadow">
//           <BarChart />
//         </div>

//         <div className=" w-[380px] h-[417px] top-[262px] left-[970px] rounded-[8px] rotate-0  shadow-customShadow bg-white opacity-100">
//           <Activity />
//         </div>
//       </div>

//       <div className="flex flex-row gap-6 mt-6">
//         <div className="w-[676px] h-[301px] rounded-[8px] opacity-100 shadow-customShadow bg-white p-4">
//           <DashboardMyInfo />
//         </div>

//         <div className="w-[380px] h-[301px] bg-white rounded-[8px] shadow-customShadow p-4">
//           <MyPieChart />
//         </div>
//       </div>
//     </div>
//   );
// }
