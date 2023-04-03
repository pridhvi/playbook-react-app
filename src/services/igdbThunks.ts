import { Cover, Game, SearchResult } from "../types";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const IGDB_API_URL = "http://localhost:4000/api/igdb";
const IGDB_API_URL = "https://playbook-node-server.onrender.com/api/igdb";

export const searchCriteriaThunk = createAsyncThunk<
  SearchResult[],
  {
    type: string;
    criteria: string;
    pageSize: number;
    pageNumber: number;
  }
>("search/getSearchCriteria", async ({ type, criteria, pageSize, pageNumber }) => {
  // calculate the element to start with for the next page
  pageNumber = pageSize * pageNumber + 1;
  const searchResult: AxiosResponse<SearchResult[], any> = await axios.get(
    `${IGDB_API_URL}/search?type=${type}&criteria=${criteria}&pageSize=${pageSize}&pageNumber=${pageNumber}`
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
    if (game.cover) {
      const coverId = Number(game.cover);

      const cover: AxiosResponse<Cover, any> = await axios.get(
        `${IGDB_API_URL}/covers/${coverId}`
      );
      game.cover = cover.data.url;
    }
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
