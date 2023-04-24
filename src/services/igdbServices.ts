import axios, { AxiosResponse } from "axios";
import { Character, Game } from "../types";

// export const IGDB_API_URL = "http://localhost:4000/api/igdb";
export const IGDB_API_URL = "https://playbook-node-server.onrender.com/api/igdb";

export const findGameById = async (id: number) => {
  const gameData: AxiosResponse<Game[], any> = await axios.get(
    `${IGDB_API_URL}/games/${id}`
  );
  let game: Game = gameData.data[0];
  // make a list of platform names
  if (game.platforms) {
    game.platformsNames = "";
    game.platforms.map((p) => {
      game.platformsNames = game.platformsNames + ", " + p.name;
    });
    game.platformsNames = game.platformsNames.substring(2);
  }

  return game;
};

export const findGameNameById = async (id: number) => {
  const gameData: AxiosResponse<Game[], any> = await axios.get(
    `${IGDB_API_URL}/games/name/${id}`
  );
  let game: Game = gameData.data[0];

  return game;
};

export const findCharacterById = async (characterId: number) => {
  const characterData: AxiosResponse<Character[], any> = await axios.get(
    `${IGDB_API_URL}/characters/${characterId}`
  );
  const character: Character = characterData.data[0];
  return character;
};
