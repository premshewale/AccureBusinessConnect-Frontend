import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";

import Kanban from "../../../components/common/Kanban";
import CommonTable from "../../../components/common/CommonTable";
import CommonExportButton from "../../../components/common/CommonExportButton";

import TaskStats from "./TaskStats";
import TaskFilter from "./TaskFilter";
import { useTasks } from "../../../contexts/TaskContext";

export default function Task() {
  const navigate = useNavigate();

  const { tasks = [], loading, deleteTask, getTaskStats } = useTasks();

  const [activeTab, setActiveTab] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All");

  const [filterOptions, setFilterOptions] = useState({
    status: "All",
    departmentId: "All",
    assigneeId: "All",
    dueDate: "All",
  });

  const stats = getTaskStats();

  const handleRefresh = () => window.location.reload();

  const exportData = tasks.map((t) => ({
    ID: t.id,
    Title: t.title,
    Status: t.status,
    Assignee: t.assignee_id,
    Department: t.department_id,
    DueDate: t.due_date,
    Created: t.createdAt,
  }));

  const filteredTasks = tasks.filter((t) => {
    if (
      searchQuery &&
      !t.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (filter !== "All" && t.status !== filter) {
      return false;
    }

    if (
      filterOptions.status !== "All" &&
      t.status !== filterOptions.status
    ) {
      return false;
    }

    if (
      filterOptions.departmentId !== "All" &&
      String(t.department_id) !== filterOptions.departmentId
    ) {
      return false;
    }

    if (
      filterOptions.assigneeId !== "All" &&
      String(t.assignee_id) !== filterOptions.assigneeId
    ) {
      return false;
    }

    return true;
  });

  const kanbanColumns = [
    {
      title: "To Do",
      cards: filteredTasks
        .filter((t) => t.status === "TODO")
        .map((t) => ({
          id: t.id,
          name: t.title,
          service: `Assignee ${t.assignee_id}`,
          status: "TODO",
        })),
    },
    {
      title: "In Progress",
      cards: filteredTasks
        .filter((t) => t.status === "IN_PROGRESS")
        .map((t) => ({
          id: t.id,
          name: t.title,
          service: `Assignee ${t.assignee_id}`,
          status: "IN_PROGRESS",
        })),
    },
    {
      title: "Done",
      cards: filteredTasks
        .filter((t) => t.status === "DONE")
        .map((t) => ({
          id: t.id,
          name: t.title,
          service: `Assignee ${t.assignee_id}`,
          status: "DONE",
        })),
    },
    {
      title: "Blocked",
      cards: filteredTasks
        .filter((t) => t.status === "BLOCKED")
        .map((t) => ({
          id: t.id,
          name: t.title,
          service: `Assignee ${t.assignee_id}`,
          status: "BLOCKED",
        })),
    },
  ];

  const statuses = ["All", "TODO", "IN_PROGRESS", "DONE", "BLOCKED"];

  const handleDelete = async (task) => {
    if (window.confirm(`Delete task "${task.title}"?`)) {
      await deleteTask(task.id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <p className="text-gray-600">
            Manage and track staff tasks
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/create-task")}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow"
        >
          + Create Task
        </button>
      </div>

      <TaskStats stats={stats} />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 p-4 bg-white rounded-lg border">
        <div className="flex gap-4">
          <CommonExportButton data={exportData} fileName="tasks" />
          <button onClick={handleRefresh} className="p-2 border rounded-lg">
            <MdOutlineRefresh />
          </button>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-10 rounded-lg border pl-10 pr-3 text-sm focus:border-cyan"
            />
          </div>

          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`px-4 py-2 rounded-lg border flex gap-2 ${
              showFilter
                ? "bg-cyan text-white border-cyan"
                : "border-gray-300"
            }`}
          >
            <IoFilterSharp /> Filter
          </button>
        </div>
      </div>

      {showFilter && (
        <TaskFilter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={() => setShowFilter(false)}
        />
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-sm border rounded-lg ${
              filter === s
                ? "bg-cyan text-white border-cyan"
                : "border-gray-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              activeTab === "kanban"
                ? "bg-white border-cyan text-cyan shadow"
                : "border-gray-300"
            }`}
          >
            <RxDashboard /> Kanban View
          </button>

          <button
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              activeTab === "table"
                ? "bg-white border-cyan text-cyan shadow"
                : "border-gray-300"
            }`}
          >
            <RxTable /> Table View
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-4">
        {loading ? (
          <div className="h-64 flex justify-center items-center">
            <div className="animate-spin h-10 w-10 border-2 border-cyan border-t-transparent rounded-full"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 p-8">
            No tasks found
          </div>
        ) : (
          <>
            {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}
            {activeTab === "table" && (
              <CommonTable
                type="tasks"
                data={filteredTasks}
                onDelete={handleDelete}
                showActions
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

