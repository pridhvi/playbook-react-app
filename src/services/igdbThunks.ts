import { Cover, Game, Platform, PlatformLogo, SearchResult } from "../types";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const IGDB_API_URL = "http://localhost:4000/api/igdb";
// const IGDB_API_URL = "https://playbook-node-server.onrender.com/api/igdb";

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
    // fetch the cover image of the game
    if (game.cover) {
      const coverId = Number(game.cover);

      const cover: AxiosResponse<Cover, any> = await axios.get(
        `${IGDB_API_URL}/covers/${coverId}`
      );
      game.cover = cover.data.url;
    }

    // if (game.platforms) {
    //   let platformsNames: string[] = []
    //   game.platforms.map(async (platformId: number) => {
    //     // const platformId = ;

    //     const platform: AxiosResponse<Platform, any> = await axios.get(
    //       `${IGDB_API_URL}/platforms/${platformId}`
    //     );
    //     // game.platform_objects.push(platform.data);
    //     platformsNames.push(platform.data.name);
    //   });
    //   game.platformsNames = platformsNames;
      
    // }
    return game;
  }
);

export const findPlatformByIdThunk = createAsyncThunk(
  "platforms/findPlatformById",
  async (id: number) => {
    const platformData: AxiosResponse<Platform[], any> = await axios.get(
      `${IGDB_API_URL}/platforms/${id}`
    );
    const platform: Platform = platformData.data[0];
    if (platform.platform_logo) {
      const platformLogoId = Number(platform.platform_logo);

      const platformLogo: AxiosResponse<PlatformLogo, any> = await axios.get(
        `${IGDB_API_URL}/platform_logos/${platformLogoId}`
      );
      platform.platform_logo = platformLogo.data.url;
    }
    return platform;
  }
);

// export const findCoverByIdThunk = createAsyncThunk(
//   "cover/findCoverById",
//   async (id: number) => {
//     const cover = await axios.get(`${IGDB_API_URL}/covers/${id}`);
//     return cover.data[0];
//   }
// );
