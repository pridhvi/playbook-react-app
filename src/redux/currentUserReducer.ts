import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, signupThunk, updateUserThunk } from "../services/usersThunks";
import { User } from "../types";

interface ModalState {
  currentUser: User;
}
const initialState: ModalState = {
  currentUser: { username: "" },
};

// const navigate = useNavigate();

const currentUserSlice = createSlice({
  name: "currentUserData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(signupThunk.rejected, (state) => {
        state.currentUser = { username: "" };
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.currentUser = { username: "" };
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.currentUser = { username: "" };
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },

  reducers: {},
});

export default currentUserSlice.reducer;
