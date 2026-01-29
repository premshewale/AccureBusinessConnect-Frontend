import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as tasksApi from "../../services/tasks/tasksApi";

// -------------------- Thunks --------------------
export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await tasksApi.getAllTasks();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await tasksApi.getTaskById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createNewTask = createAsyncThunk(
  "tasks/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await tasksApi.createTask(payload);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateExistingTask = createAsyncThunk(
  "tasks/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await tasksApi.updateTask({ id, payload });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      return await tasksApi.deleteTaskApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const changeTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await tasksApi.updateTaskStatus({ id, status });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchTasksByAssignee = createAsyncThunk(
  "tasks/fetchByAssignee",
  async (assigneeId, { rejectWithValue }) => {
    try {
      return await tasksApi.getTasksByAssignee(assigneeId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// -------------------- Slice --------------------
const initialState = {
  loading: false,
  tasks: [],
  task: null,
  success: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetTaskState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE TASK
      .addCase(createNewTask.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks.push(action.payload);
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE TASK
      .addCase(updateExistingTask.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateExistingTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks = state.tasks.map(t =>
          t.id === action.payload.id ? action.payload : t
        );
      })
      .addCase(updateExistingTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE TASK
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks = state.tasks.filter(t => t.id !== action.payload.id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        state.tasks = state.tasks.map(t =>
          t.id === action.payload.id ? action.payload : t
        );
      })

      // FETCH BY ASSIGNEE
      .addCase(fetchTasksByAssignee.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export const { resetTaskState } = tasksSlice.actions;
export default tasksSlice.reducer;
