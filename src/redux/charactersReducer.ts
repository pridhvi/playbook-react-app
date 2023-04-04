import { createSlice } from "@reduxjs/toolkit";
import { findCharacterByIdThunk } from "../services/igdbThunks";
import { Character } from "../types";

interface ModalState {
  characters: Character[];
  loading: boolean;
}
const initialState: ModalState = {
  characters: [],
  loading: false,
};

const charactersSlice = createSlice({
  name: "charactersData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(findCharacterByIdThunk.pending, (state) => {
        state.loading = true;
        state.characters = [];
      })
      .addCase(findCharacterByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.characters.push(action.payload);
      });
  },

  reducers: {},
});

export default charactersSlice.reducer;
