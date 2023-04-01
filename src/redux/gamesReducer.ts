import { createSlice } from "@reduxjs/toolkit";
import { getGamesWithKeywordThunk } from "../services/gamesThunks";
import { Game } from "../types";
import { AxiosResponse } from "axios";

interface ModalState {
    games: Game[],
    loading: boolean,
}
const initialState: ModalState = {
  games: [],
  loading: false,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGamesWithKeywordThunk.pending, (state) => {
        state.loading = true;
        state.games = [];
      })
      .addCase(getGamesWithKeywordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      });
  },

  reducers: {},
});

export const {} = gamesSlice.actions;
export default gamesSlice.reducer;
