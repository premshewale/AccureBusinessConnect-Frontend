import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile } from "../../services/profile/profileApi";
import { updateMyProfile } from "../../services/profile/updateProfileApi";

const initialState = {
  loading: false,
  updating: false,
  profile: null,
  error: null,
  success: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: () => initialState,
    resetProfileUpdate: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- GET PROFILE ---------- */
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE PROFILE ---------- */
      .addCase(updateMyProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload; // updated profile
        state.success = true;
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfile, resetProfileUpdate } = profileSlice.actions;
export default profileSlice.reducer;
