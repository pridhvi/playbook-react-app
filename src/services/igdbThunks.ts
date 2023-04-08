import { Character, Picture, Game, SearchResult } from "../types";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGDB_API_URL, findCharacterById, findGameById } from "./igdbServices";

export const searchCriteriaThunk = createAsyncThunk<
  SearchResult[],
  {
    type: string;
    criteria: string;
    pageSize: number;
    pageNumber: number;
  }
>(
  "search/getSearchCriteria",
  async ({ type, criteria, pageSize, pageNumber }) => {
    // calculate the element to start with for the next page
    pageNumber = pageSize * pageNumber + 1;
    const searchResult: AxiosResponse<SearchResult[], any> = await axios.get(
      `${IGDB_API_URL}/search?type=${type}&criteria=${criteria}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    return searchResult.data as SearchResult[];
  }
);

export const findGameByIdThunk = createAsyncThunk(
  "game/findGameById",
  async (id: number) => {
    const game: Game = await findGameById(id);
    return game;
  }
);

export const findCharacterByIdThunk = createAsyncThunk(
  "character/findCharacterById",
  async (id: number) => {
    const character: Character = await findCharacterById(id);
    return character;
  }
);
