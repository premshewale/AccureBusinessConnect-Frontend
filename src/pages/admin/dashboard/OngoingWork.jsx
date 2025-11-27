import React, { useState } from "react";

export default function DashboardMyInfo() {
  const [activeSection, setActiveSection] = useState("tasks"); // default open

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

  return (
    <div >

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b pb-3">
        <button
          onClick={() => setActiveSection("tasks")}
          className={`px-4 py-2 rounded-lg font-semibold transition 
            ${activeSection === "tasks" ? "bg-cyan text-white" : "bg-gray-200"}
          `}
        >
          My Tasks
        </button>

        <button
          onClick={() => setActiveSection("projects")}
          className={`px-4 py-2 rounded-lg font-semibold transition 
            ${activeSection === "projects" ? "bg-cyan text-white" : "bg-gray-200"}
          `}
        >
          My Projects
        </button>

        <button
          onClick={() => setActiveSection("reminders")}
          className={`px-4 py-2 rounded-lg font-semibold transition 
            ${activeSection === "reminders" ? "bg-cyan text-white" : "bg-gray-200"}
          `}
        >
          Reminders
        </button>
      </div>

      {/* Tasks */}
      {activeSection === "tasks" && (
        <div>
          <h2 className="text-xl font-bold mb-4">My Tasks</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">#</th>
                <th className="p-2 border-b">Task Name</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Start Date</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{task.id}</td>
                  <td className="p-2 border-b">{task.name}</td>

                  <td className="p-2 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="p-2 border-b">{task.start}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Projects */}
      {activeSection === "projects" && (
        <div>
          <h2 className="text-xl font-bold mb-4">My Projects</h2>

          <ul className="space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                className="border p-3 rounded-lg flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium">{project.title}</span>
                <span className="text-sm text-gray-600">{project.progress} Complete</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reminders */}
      {activeSection === "reminders" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Reminders</h2>

          <ul className="list-disc pl-6 space-y-2">
            {reminders.map((r) => (
              <li key={r.id} className="text-gray-700">
                {r.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
