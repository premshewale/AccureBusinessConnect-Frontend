import adminApi from "../../store/adminApi";

// ===============================
// GET ALL TASKS
// ===============================
export const getAllTasks = async () => {
  const res = await adminApi.get("/tasks");
  return res.data;
};

// ===============================
// GET TASK BY ID
// ===============================
export const getTaskById = async (id) => {
  const res = await adminApi.get(`/tasks/${id}`);
  return res.data;
};

// ===============================
// CREATE TASK
// ===============================
export const createTask = async (payload) => {
  const res = await adminApi.post("/tasks", payload);
  return res.data;
};

// ===============================
// UPDATE TASK
// ===============================
export const updateTask = async ({ id, payload }) => {
  const res = await adminApi.put(`/tasks/${id}`, payload);
  return res.data;
};

// ===============================
// DELETE TASK
// ===============================
export const deleteTaskApi = async (id) => {
  await adminApi.delete(`/tasks/${id}`);
  return { id };
};

// ===============================
// UPDATE TASK STATUS
// ===============================
export const updateTaskStatus = async ({ id, status }) => {
  const res = await adminApi.put(`/tasks/${id}/status`, { status });
  return res.data;
};

// ===============================
// GET TASKS BY ASSIGNEE
// ===============================
export const getTasksByAssignee = async (assigneeId) => {
  const res = await adminApi.get("/tasks", { params: { assignee_id: assigneeId } });
  return res.data;
};
