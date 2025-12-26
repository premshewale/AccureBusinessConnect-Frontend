import { createSlice } from "@reduxjs/toolkit";
import { adminGetContacts } from "../../services/contact/adminGetContactsApi";

const initialState = {
  loading: false,
  contacts: [],
  error: null,
};

const adminGetContactsSlice = createSlice({
  name: "adminGetContacts",
  initialState,
  reducers: {
    resetAdminGetContacts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminGetContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(adminGetContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminGetContacts } = adminGetContactsSlice.actions;
export default adminGetContactsSlice.reducer;
