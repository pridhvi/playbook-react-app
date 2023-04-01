import { Game } from "../types";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const GAME_URL = "https://api.igdb.com/v4/games";
let config = {
  headers: {
    "Client-ID": "xbkb34auz0iwe92z06zbbsj7xnekr6",
    "Authorization": "Bearer bkdc6lq8ibgdt4omp4u9vvp1it4aez",
    "Content-Type": "text/plain",
  },
};

export const getGamesWithKeywordThunk = createAsyncThunk(
  "games/getGamesWithKeyword",
  async (keyword: string) => {
    let data = `search "${keyword}";\nf name,rating,cover.url;\nw id = 24213;\nl 50;\no 100;`;
    const res = await axios.post(GAME_URL, { ...config, data: data });
    return res.data as Game[];
  }
);

export const deleteTuitThunk = createAsyncThunk(
  "tuits/deleteTuit",
  async (tuitId) => {
    // await service.deleteTuit(tuitId)
    return tuitId;
  }
);

export const createTuitThunk = createAsyncThunk(
  "tuits/createTuit",
  async (tuit) => {
    // const newTuit = await service.createTuit(tuit)
    return tuit;
  }
);

export const updateTuitThunk = createAsyncThunk(
  "tuits/updateTuit",
  async (tuit) => {}
);
