import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ShowDetails from "../../../components/common/ShowDetails";
import {
  fetchTaskById,
  resetTaskState,
} from "../../../slices/tasks/tasksSlice";

export default function ShowTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { task, loading, error } = useSelector((state) => state.tasks);
  const { role } = useSelector((state) => state.auth);

  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  /* =======================
     FETCH TASK
  ======================= */
  useEffect(() => {
    if (id) dispatch(fetchTaskById(id));

    return () => {
      dispatch(resetTaskState());
    };
  }, [dispatch, id]);

  /* =======================
     STATES
  ======================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-t-2 border-cyan rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-6">
        {typeof error === "string" ? error : "Failed to fetch task details"}
      </p>
    );
  }

  if (!task) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Task not found
      </p>
    );
  }

  /* =======================
     FORMAT DATA
  ======================= */
  const formattedTask = {
    ID: task.id,
    Title: task.title || "-",
    Status: task.status?.replace("_", " ") || "-",
    Assignee: task.assigneeName || "-",
    Assignee_ID: task.assigneeId || "-",
    Department: task.departmentName || "-",
    Department_ID: task.departmentId || "-",
    Due_Date: task.dueDate
      ? new Date(task.dueDate).toLocaleDateString("en-IN")
      : "-",
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(`/${rolePath}/task`)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      {/* Task Details */}
      <ShowDetails title="Task Details" data={formattedTask} />
    </div>
  );
}
