import { createSlice } from "@reduxjs/toolkit";
import { searchCriteriaThunk } from "../services/igdbThunks";
import { SearchResult } from "../types";

interface ModalState {
  searchResult: SearchResult[];
  loading: boolean;
}
const initialState: ModalState = {
  searchResult: [],
  loading: false,
};

const searchResultSlice = createSlice({
  name: "searchResult",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(searchCriteriaThunk.pending, (state) => {
        state.loading = true;
        state.searchResult = [];
      })
      .addCase(searchCriteriaThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload;
      });
  },

  reducers: {},
});

export default searchResultSlice.reducer;
