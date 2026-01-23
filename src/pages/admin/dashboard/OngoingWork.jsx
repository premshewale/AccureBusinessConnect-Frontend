// import React, { useState } from "react";

// export default function DashboardMyInfo() {
//   const [activeSection, setActiveSection] = useState("tasks"); // default open

//   const tasks = [
//     { id: 1, name: "Follow up with client", status: "In Progress", start: "2025-01-20" },
//     { id: 2, name: "Prepare project report", status: "Pending", start: "2025-01-15" },
//     { id: 3, name: "UI design changes", status: "Completed", start: "2025-01-10" },
//   ];

//   const projects = [
//     { id: 1, title: "CRM Dashboard", progress: "80%" },
//     { id: 2, title: "Mobile App UI", progress: "40%" },
//   ];

//   const reminders = [
//     { id: 1, text: "Call client at 5 PM" },
//     { id: 2, text: "Complete UI revisions by tomorrow" },
//   ];

//   return (
//     <div >

//       {/* Tabs */}
//       <div className="flex gap-4 mb-4 border-b pb-3">
//         <button
//           onClick={() => setActiveSection("tasks")}
//           className={`px-4 py-2 rounded-lg font-semibold transition 
//             ${activeSection === "tasks" ? "bg-cyan text-white" : "bg-gray-200"}
//           `}
//         >
//           My Tasks
//         </button>

//         <button
//           onClick={() => setActiveSection("projects")}
//           className={`px-4 py-2 rounded-lg font-semibold transition 
//             ${activeSection === "projects" ? "bg-cyan text-white" : "bg-gray-200"}
//           `}
//         >
//           My Projects
//         </button>

//         <button
//           onClick={() => setActiveSection("reminders")}
//           className={`px-4 py-2 rounded-lg font-semibold transition 
//             ${activeSection === "reminders" ? "bg-cyan text-white" : "bg-gray-200"}
//           `}
//         >
//           Reminders
//         </button>
//       </div>

//       {/* Tasks */}
//       {activeSection === "tasks" && (
//         <div>
//           <h2 className="text-xl font-bold mb-4">My Tasks</h2>

//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-2 border-b">#</th>
//                 <th className="p-2 border-b">Task Name</th>
//                 <th className="p-2 border-b">Status</th>
//                 <th className="p-2 border-b">Start Date</th>
//               </tr>
//             </thead>

//             <tbody>
//               {tasks.map((task) => (
//                 <tr key={task.id} className="hover:bg-gray-50">
//                   <td className="p-2 border-b">{task.id}</td>
//                   <td className="p-2 border-b">{task.name}</td>

//                   <td className="p-2 border-b">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium
//                         ${
//                           task.status === "Completed"
//                             ? "bg-green-100 text-green-700"
//                             : task.status === "In Progress"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-red-100 text-red-700"
//                         }
//                       `}
//                     >
//                       {task.status}
//                     </span>
//                   </td>

//                   <td className="p-2 border-b">{task.start}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Projects */}
//       {activeSection === "projects" && (
//         <div>
//           <h2 className="text-xl font-bold mb-4">My Projects</h2>

//           <ul className="space-y-3">
//             {projects.map((project) => (
//               <li
//                 key={project.id}
//                 className="border p-3 rounded-lg flex justify-between items-center hover:bg-gray-50"
//               >
//                 <span className="font-medium">{project.title}</span>
//                 <span className="text-sm text-gray-600">{project.progress} Complete</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Reminders */}
//       {activeSection === "reminders" && (
//         <div>
//           <h2 className="text-xl font-bold mb-4">Reminders</h2>

//           <ul className="list-disc pl-6 space-y-2">
//             {reminders.map((r) => (
//               <li key={r.id} className="text-gray-700">
//                 {r.text}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiLayers } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";

export default function DashboardMyInfo() {
  const [activeSection, setActiveSection] = useState("tasks");

  const tasks = [
    { id: 1, name: "Follow up with client", status: "In Progress", start: "2025-01-20" },
    { id: 2, name: "Prepare project report", status: "Pending", start: "2025-01-15" },
    { id: 3, name: "UI design changes", status: "Completed", start: "2025-01-10" },
  ];

  const projects = [
    { id: 1, title: "CRM Dashboard", progress: "80%" },
    { id: 2, title: "Mobile App UI", progress: "40%" },
  ];

  const reminders = [
    { id: 1, text: "Call client at 5 PM" },
    { id: 2, text: "Complete UI revisions by tomorrow" },
  ];

  const getStatusStyle = (status) => {
    if (status === "In Progress") return "bg-[#DFF7FF] text-[#0AA3B8]";
    if (status === "Pending") return "bg-[#FFF3D6] text-[#C28A00]";
    if (status === "Completed") return "bg-[#DFF7E6] text-[#1FA84B]";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="w-full h-full">
      {/* Tabs */}
      <div className="flex items-center gap-6 sm:gap-10 px-3 sm:px-5 pt-3 border-b border-[#EAEAEA] overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveSection("tasks")}
          className={`flex items-center gap-2 pb-2 font-Lato text-[14px] sm:text-[18px]
            ${
              activeSection === "tasks"
                ? "text-black border-b-[3px] border-[#128B96]"
                : "text-[#6B6B6B]"
            }`}
        >
          <HiOutlineClipboardList className="text-[18px] sm:text-[22px]" />
          My Tasks
        </button>

        <button
          onClick={() => setActiveSection("projects")}
          className={`flex items-center gap-2 pb-2 font-Lato text-[14px] sm:text-[18px]
            ${
              activeSection === "projects"
                ? "text-black border-b-[3px] border-[#128B96]"
                : "text-[#6B6B6B]"
            }`}
        >
          <FiLayers className="text-[16px] sm:text-[20px]" />
          My Projects
        </button>

        <button
          onClick={() => setActiveSection("reminders")}
          className={`flex items-center gap-2 pb-2 font-Lato text-[14px] sm:text-[18px]
            ${
              activeSection === "reminders"
                ? "text-black border-b-[3px] border-[#128B96]"
                : "text-[#6B6B6B]"
            }`}
        >
          <FiClock className="text-[16px] sm:text-[20px]" />
          Reminders
        </button>
      </div>

      {/* Content area */}
      <div className="px-3 sm:px-5 py-3 h-[calc(100%-52px)] overflow-hidden">
        {/* TASKS */}
        {activeSection === "tasks" && (
          <div className="border border-[#EAEAEA] rounded-md overflow-hidden h-full">
            {/* ✅ MOBILE VIEW (Cards) */}
            <div className="block sm:hidden p-3 space-y-3 overflow-y-auto h-full">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-[#EAEAEA] rounded-lg p-3 bg-white"
                >
                  <div className="flex justify-between items-start gap-3">
                    <p className="font-Lato text-[13px] text-[#4A4A4A] font-semibold leading-snug">
                      {task.name}
                    </p>

                    <span
                      className={`px-2 py-1 rounded-md font-Lato text-[11px] flex items-center gap-1 ${getStatusStyle(
                        task.status
                      )}`}
                    >
                      {task.status}
                      <IoChevronDownOutline size={12} />
                    </span>
                  </div>

                  <p className="font-Lato text-[11px] text-[#7A7A7A] mt-1">
                    Tags - {task.name}
                  </p>

                  <p className="font-Lato text-[11px] text-[#4A4A4A] mt-2">
                    <span className="text-[#7A7A7A]">Start date:</span> {task.start}
                  </p>
                </div>
              ))}
            </div>

            {/* ✅ DESKTOP VIEW (Table) */}
            <div className="hidden sm:block h-full">
              {/* Header */}
              <div className="grid grid-cols-[60px_1fr_200px_150px] bg-[#FAFAFA] border-b border-[#EAEAEA] text-[14px] font-Lato text-[#4A4A4A]">
                <div className="p-3 border-r border-[#EAEAEA]">#</div>
                <div className="p-3 border-r border-[#EAEAEA]">Task name</div>
                <div className="p-3 border-r border-[#EAEAEA]">Status</div>
                <div className="p-3">Start date</div>
              </div>

              {/* Rows */}
              <div className="h-[calc(100%-44px)] overflow-y-auto">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-[60px_1fr_200px_150px] border-b border-[#EAEAEA] last:border-b-0"
                  >
                    <div className="p-3 border-r border-[#EAEAEA] text-[#6B6B6B] font-Lato">
                      #
                    </div>

                    <div className="p-3 border-r border-[#EAEAEA]">
                      <p className="font-Lato text-[14px] text-[#4A4A4A] leading-snug">
                        {task.name}
                      </p>
                      <p className="font-Lato text-[12px] text-[#7A7A7A] mt-1">
                        Tags - {task.name}
                      </p>
                    </div>

                    <div className="p-3 border-r border-[#EAEAEA] flex items-center">
                      <span
                        className={`px-3 py-1 rounded-md font-Lato text-[13px] flex items-center gap-2 ${getStatusStyle(
                          task.status
                        )}`}
                      >
                        {task.status}
                        <IoChevronDownOutline size={14} />
                      </span>
                    </div>

                    <div className="p-3 flex items-center font-Lato text-[14px] text-[#4A4A4A]">
                      {task.start}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeSection === "projects" && (
          <div className="border border-[#EAEAEA] rounded-md p-3 sm:p-4 h-full font-Lato text-[#4A4A4A] overflow-y-auto">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex justify-between border-b py-2 last:border-b-0 text-[13px] sm:text-[14px]"
              >
                <span>{p.title}</span>
                <span className="text-[#7A7A7A]">{p.progress}</span>
              </div>
            ))}
          </div>
        )}

        {/* REMINDERS */}
        {activeSection === "reminders" && (
          <div className="border border-[#EAEAEA] rounded-md p-3 sm:p-4 h-full font-Lato text-[#4A4A4A] overflow-y-auto">
            {reminders.map((r) => (
              <div
                key={r.id}
                className="border-b py-2 last:border-b-0 text-[13px] sm:text-[14px]"
              >
                {r.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

