import { createSlice } from "@reduxjs/toolkit";
import { findGameByIdThunk } from "../services/igdbThunks";
import { Game } from "../types";

interface ModalState {
  games: Game[];
  loading: boolean;
}
const initialState: ModalState = {
  games: [],
  loading: false,
};

const gamesSlice = createSlice({
  name: "gamesData",
  initialState,
  extraReducers: (builder) => {
    builder
      // .addCase(findGameByIdForSearchThunk.pending, (state) => {
      //   state.loading = true;
      //   state.games = [];
      // })
      // .addCase(findGameByIdForSearchThunk.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.games.push(action.payload);
      // })
      .addCase(findGameByIdThunk.pending, (state) => {
        state.loading = true;
        state.games = [];
      })
      .addCase(findGameByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.games.push(action.payload);
      });
  },

  reducers: {},
});

export default gamesSlice.reducer;
