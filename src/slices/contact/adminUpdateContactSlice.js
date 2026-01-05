import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateContact } from "../../services/contact/adminUpdateContactApi";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const adminUpdateContactSlice = createSlice({
  name: "adminUpdateContact",
  initialState,
  reducers: {
    resetUpdateContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminUpdateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminUpdateContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminUpdateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateContactState } =
  adminUpdateContactSlice.actions;

export default adminUpdateContactSlice.reducer;
