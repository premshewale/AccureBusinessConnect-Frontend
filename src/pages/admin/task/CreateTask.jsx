import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm";
import {
  createNewTask,
  resetTaskState,
} from "../../../slices/tasks/tasksSlice";
import { showError, showSuccess } from "../../../utils/toast";

export default function CreateTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.tasks);
  const { role } = useSelector((state) => state.auth.user);
  const rolePath = role?.toLowerCase() || "admin"; // fallback to "admin"

  const fields = [
    {
      name: "customerId",
      label: "Customer ID",
      type: "number",
      required: true,
    },
    { name: "title", label: "Task Title", type: "text", required: true },
    {
      name: "assigneeId",
      label: "Assignee ID",
      type: "number",
      required: true,
    },
    { name: "departmentId", label: "Department ID", type: "number" },
    { name: "dueDate", label: "Due Date", type: "date" },
  ];

  const validateForm = (data) => {
    if (!data.title || data.title.trim() === "") {
      showError("Task title is required");
      return false;
    }
    if (!data.customerId || Number(data.customerId) <= 0) {
      showError("Customer ID is required and must be > 0");
      return false;
    }
    if (!data.assigneeId || Number(data.assigneeId) <= 0) {
      showError("Assignee ID is required and must be > 0");
      return false;
    }
    return true;
  };

  const handleSubmit = (data) => {
    if (!validateForm(data)) return;

    dispatch(
      createNewTask({
        customer_id: Number(data.customerId),
        title: data.title,
        assignee_id: Number(data.assigneeId),
        department_id: Number(data.departmentId) || null,
        due_date: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      }),
    );
  };

  useEffect(() => {
    if (success) {
      showSuccess("Task created successfully!");
      dispatch(resetTaskState());
      navigate(`/${rolePath}/task`);
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      showError(typeof error === "string" ? error : error.message);
    }
  }, [error]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      {loading && <p>Creating task...</p>}
      <CommonForm
        title="Task Information"
        fields={fields}
        onSubmit={handleSubmit}
        submitText="Create Task"
      />
    </div>
  );
}
