import {
  Character,
  Picture,
  Game,
  SearchResult,
} from "../types";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const IGDB_API_URL = "http://localhost:4000/api/igdb";
const IGDB_API_URL = "https://playbook-node-server.onrender.com/api/igdb";

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
    const gameData: AxiosResponse<Game[], any> = await axios.get(
      `${IGDB_API_URL}/games/${id}`
    );
    let game: Game = { ...gameData.data[0], platformsNames: "" };
    // fetch the cover image of the game
    // if (game.cover) {
    //   const coverId = Number(game.cover);

    //   const cover: AxiosResponse<Picture, any> = await axios.get(
    //     `${IGDB_API_URL}/covers/${coverId}`
    //   );
    //   game.cover = cover.data.url;
    // }
    // fetch the platforms of the game
    if (game.platforms) {
      let platformsNames = "";
      await Promise.all(
        game.platforms.map((platformId) => {
          return axios.get(`${IGDB_API_URL}/platforms/${platformId}`);
        })
      ).then((platformData) => {
        platformData.map((p) => {
          platformsNames = platformsNames + ", " + p.data[0].name;
        });
      });

      game = { ...game, platformsNames: platformsNames.substring(2) };
    }

    // if(game.artworks) {
    //   let artworkUrls = "";
    //   await Promise.all(
    //     game.platforms.map((platformId) => {
    //       return axios.get(`${IGDB_API_URL}/platforms/${platformId}`);
    //     })
    //   ).then((platformData) => {
    //     platformData.map((p) => {
    //       platformsNames = platformsNames + ", " + p.data[0].name;
    //     });
    //   });

    //   game = { ...game, platformsNames: platformsNames.substring(2) };
    // }

    return game;
  }
);

export const findCharacterByIdThunk = createAsyncThunk(
  "character/findCharacterById",
  async (id: number) => {
    const characterData: AxiosResponse<Character[], any> = await axios.get(
      `${IGDB_API_URL}/characters/${id}`
    );
    const character: Character = characterData.data[0];
    return character;
  }
);
