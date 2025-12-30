import { createSlice } from "@reduxjs/toolkit";
import { adminGetAllLeads } from "../../services/lead/adminGetAllLeadsApi";
import { adminDeleteLeadApi } from "../../services/lead/adminDeleteLeadApi";

const initialState = {
  loading: false,
  leads: [],
  error: null,
};

const adminGetAllLeadsSlice = createSlice({
  name: "adminGetAllLeads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminGetAllLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetAllLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(adminGetAllLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔥 THIS IS THE FIX
      .addCase(adminDeleteLeadApi.fulfilled, (state, action) => {
        state.leads = state.leads.filter(
          (lead) => lead.id !== action.payload
        );
      });
  },
});

export default adminGetAllLeadsSlice.reducer;
