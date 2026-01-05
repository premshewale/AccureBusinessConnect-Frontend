import { createSlice } from "@reduxjs/toolkit";
import { adminGetContactById } from "../../services/contact/adminGetContactByIdApi";

const initialState = {
  loading: false,
  contact: null,
  error: null,
};

const adminGetContactByIdSlice = createSlice({
  name: "adminGetContactById",
  initialState,
  reducers: {
    resetContactDetails: (state) => {
      state.loading = false;
      state.contact = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
      })
      .addCase(adminGetContactById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch contact details";
      });
  },
});

export const { resetContactDetails } = adminGetContactByIdSlice.actions;
export default adminGetContactByIdSlice.reducer;
