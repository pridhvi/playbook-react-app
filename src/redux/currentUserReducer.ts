import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, signupThunk } from "../services/usersThunks";

interface ModalState {
  currentUser: any;
  loading: boolean;
  error: string;
}
const initialState: ModalState = {
  currentUser: {username: "",},
  loading: false,
  error: "",
};

const currentUserSlice = createSlice({
  name: "currentUserData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.currentUser = {};
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.currentUser = action.payload;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "User already exists. Please log in instead.";
        state.currentUser = {username: "",};
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.currentUser = {};
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.currentUser = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Invalid credentials. Try again.";
        state.currentUser = {username: "",};
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.currentUser = {username: "",};
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to logout.";
        // state.currentUser = {username: "",};
      });
  },

  reducers: {},
});

export default currentUserSlice.reducer;
