import axios, { AxiosResponse } from "axios";
import { Comment, Game, User } from "../types";

// const BASE_URL = "http://localhost:4000/api/trending";
const BASE_URL = "https://playbook-node-server.onrender.com/api/trending";

const api = axios.create({
  withCredentials: true,
});


export const getTrendingGames = async () => {
  const latestGames: AxiosResponse<Game[], any> = await api.get(
    `${BASE_URL}/games`
  );
  return latestGames.data;
};

export const getTrendingUsers = async () => {
    const latestUsers: AxiosResponse<User[], any> = await api.get(
      `${BASE_URL}/users`
    );
    return latestUsers.data;
  };
  