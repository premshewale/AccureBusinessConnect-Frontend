import React from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm";
import { useTasks } from "../../../contexts/TaskContext";

export default function CreateTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const handleSubmit = (data) => {
    addTask({
      customer_id: Number(data.customerId),
      title: data.title,
      assignee_id: Number(data.assigneeId),
      department_id: Number(data.departmentId),
      due_date: data.dueDate,
    });
    alert("Task created successfully!");
    navigate("/admin/task");
  };

  const fields = [
    { name: "customerId", label: "Customer ID", type: "number", required: true },
    { name: "title", label: "Task Title", type: "text", required: true },
    { name: "assigneeId", label: "Assignee ID", type: "number", required: true },
    { name: "departmentId", label: "Department ID", type: "number" },
    { name: "dueDate", label: "Due Date", type: "date" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <CommonForm
        title="Task Information"
        fields={fields}
        onSubmit={handleSubmit}
        submitText="Create Task"
      />
    </div>
  );
}
