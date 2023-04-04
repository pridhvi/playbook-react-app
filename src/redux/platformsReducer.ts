import { createSlice } from "@reduxjs/toolkit";
import { findPlatformByIdThunk } from "../services/igdbThunks";
import { Platform } from "../types";

interface ModalState {
  platforms: Platform[];
  loading: boolean;
}
const initialState: ModalState = {
  platforms: [],
  loading: false,
};

const platformsSlice = createSlice({
  name: "platformsData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(findPlatformByIdThunk.pending, (state) => {
        state.loading = true;
        state.platforms = [];
      })
      .addCase(findPlatformByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.platforms.push(action.payload);
      });
  },

  reducers: {},
});

export default platformsSlice.reducer;
