import { createSlice } from "@reduxjs/toolkit";
import { findGameByIdThunk } from "../services/igdbThunks";
import { Game } from "../types";

interface ModalState {
  game: Game | null;
  loading: boolean;
}
const initialState: ModalState = {
  game: null,
  loading: false,
};

const gameSlice = createSlice({
  name: "gameData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(findGameByIdThunk.pending, (state) => {
        state.loading = true;
        state.game = null;
      })
      .addCase(findGameByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
      });
  },

  reducers: {},
});

export default gameSlice.reducer;
