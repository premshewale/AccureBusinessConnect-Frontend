import { createSlice } from "@reduxjs/toolkit";
import { getAllTickets } from "../../services/ticket/ticketAPI";
import { escalateTicketApi } from "../../services/ticket/escalateTicketApi";

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearTicketError(state) {
      state.error = null;
    },
  },

extraReducers: (builder) => {
  builder
    // GET ALL TICKETS
    .addCase(getAllTickets.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(getAllTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ✅ ESCALATE TICKET (IMPORTANT)
    .addCase(escalateTicketApi.fulfilled, (state, action) => {
      const updatedTicket = action.payload;

      const index = state.list.findIndex(
        (ticket) => ticket.id === updatedTicket.id
      );

      if (index !== -1) {
        state.list[index] = updatedTicket;
      }
    });
},

});

export const { clearTicketError } = ticketSlice.actions;
export default ticketSlice.reducer;
