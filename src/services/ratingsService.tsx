import axios, { AxiosResponse } from "axios";
import { Comment, Rating } from "../types";

// const BASE_URL = "http://localhost:4000/api/ratings";
const BASE_URL = "https://playbook-node-server.onrender.com/api/ratings";

const api = axios.create({
  withCredentials: true,
});

export const getAllRatingsByItem = async (
  itemType: string,
  itemId: number
) => {
  const ratings: AxiosResponse<Rating[], any> = await api.get(
    `${BASE_URL}/${itemType}/${itemId}`
  );
  return ratings.data;
};

export const getAllRatingsByUsername = async (
    username: string
  ) => {
    const comments: AxiosResponse<Rating[], any> = await api.get(
      `${BASE_URL}/${username}`
    );
    return comments.data;
  };

export const createRating = async (rating: Rating) => {
  const ratings: AxiosResponse<Rating[], any> = await api.post(
    `${BASE_URL}`,
    rating
  );
  return ratings.data;
};

export const deleteRating = async (rating: Rating) => {
  const ratings: AxiosResponse<Rating[], any> = await api.delete(
    `${BASE_URL}/${rating._id}`
  );
  return ratings.data;
};

export const updateRating = async (rating: Rating) => {
  const response: AxiosResponse<Rating, any> = await api.put(
    `${BASE_URL}/${rating._id}`,
    rating
  );
  return response.data;
};
