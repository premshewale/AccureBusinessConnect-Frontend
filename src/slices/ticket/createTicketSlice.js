import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTicket } from "../../services/ticket/createTicketApi";

// Async thunk for creating a ticket
export const createTicketThunk = createAsyncThunk(
  "tickets/create",
  async (ticketData, { rejectWithValue }) => {
    try {
      const result = await createTicket(ticketData);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const createTicketSlice = createSlice({
  name: "createTicket",
  initialState: {
    ticket: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCreateTicketError(state) {
      state.error = null;
    },
    clearCreatedTicket(state) {
      state.ticket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicketThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicketThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload;
      })
      .addCase(createTicketThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCreateTicketError, clearCreatedTicket } = createTicketSlice.actions;
export default createTicketSlice.reducer;
