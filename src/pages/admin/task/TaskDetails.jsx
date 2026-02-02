import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CommonDetails from "../../../components/common/CommonDetails";
import {
  fetchTaskById,
  updateExistingTask,
  resetTaskState,
} from "../../../slices/tasks/tasksSlice";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { task, loading, error } = useSelector((state) => state.tasks);
  const { role } = useSelector((state) => state.auth.user);
  const rolePath = role?.toLowerCase() || "admin"; // fallback to "admin"

  const [editedData, setEditedData] = useState({});
  const [updating, setUpdating] = useState(false);

  // Fetch task by ID
  useEffect(() => {
    dispatch(fetchTaskById(id));

    return () => {
      dispatch(resetTaskState());
    };
  }, [id, dispatch]);

  // Sync API data into form
  useEffect(() => {
    if (task) setEditedData(task);
  }, [task]);

  // Save changes
  const handleSave = () => {
    setUpdating(true);
    dispatch(updateExistingTask({ id, payload: editedData }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate(`/${rolePath}/task`);
        }
      })
      .finally(() => setUpdating(false));
  };

  if (loading) return <div className="p-4">Loading task details...</div>;
  if (!task) return <div className="p-4 text-red-500">Task not found</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <CommonDetails
      title="Task Details"
      data={editedData}
      fields={[
        { name: "id", label: "Task ID", readOnly: true },
        { name: "title", label: "Title" },
        {
          name: "status",
          label: "Status",
          type: "select",
          // fixed to match backend ENUM exactly
          options: ["TODO", "IN_PROGRESS", "DONE", "BLOCKED"],
        },

        // Assignee
        { name: "assigneeName", label: "Assignee Name", readOnly: true },
        { name: "assigneeId", label: "Assignee ID", readOnly: true },

        // Department
        { name: "departmentName", label: "Department Name", readOnly: true },
        { name: "departmentId", label: "Department ID", readOnly: true },

        // Due date
        { name: "dueDate", label: "Due Date", type: "date" },
      ]}
      isEditMode={true}
      editedData={editedData}
      setEditedData={setEditedData}
      onSave={handleSave}
      loading={updating}
      onBack={() => navigate(`/${rolePath}/task`)}
    />
  );
}
