import { Game, SearchResult } from "../types";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const IGDB_API_URL = "http://localhost:4000/api/igdb";
const IGDB_API_URL = "https://playbook-node-server.onrender.com/api/igdb";

export const searchCriteriaThunk = createAsyncThunk<
  SearchResult[],
  {
    keyword: string;
    pageSize: number;
    pageNumber: number;
  }
>("search/getSearchCriteria", async ({ keyword, pageSize, pageNumber }) => {
  // calculate the element to start with for the next page
  pageNumber = pageSize * pageNumber + 1;
  const searchResult = await axios.get(
    `${IGDB_API_URL}/search?keyword=${keyword}&pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
  return searchResult.data as SearchResult[];
});

export const findGameByIdThunk = createAsyncThunk(
  "game/findGameById",
  async (id: number) => {
    const gameData: AxiosResponse<Game[], any> = await axios.get(
      `${IGDB_API_URL}/games/${id}`
    );
    const game: Game = gameData.data[0];
    const coverId = Number(game.cover);

    const coverURL: AxiosResponse<string, any> = await axios.get(
      `${IGDB_API_URL}/covers/${coverId}`
    );
    game.cover = coverURL.data;
    return game;
  }
);

// export const findCoverByIdThunk = createAsyncThunk(
//   "cover/findCoverById",
//   async (id: number) => {
//     const cover = await axios.get(`${IGDB_API_URL}/covers/${id}`);
//     return cover.data[0];
//   }
// );
