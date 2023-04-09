import axios, { AxiosResponse } from "axios";
import { Comment } from "../types";

// const BASE_URL = "http://localhost:4000/api/comments";
const BASE_URL = "https://playbook-node-server.onrender.com/api/comments";

const api = axios.create({
  withCredentials: true,
});

export const getAllCommentsByItem = async (
  itemType: string,
  itemId: number
) => {
  const comments: AxiosResponse<Comment[], any> = await api.get(
    `${BASE_URL}/${itemType}/${itemId}`
  );
  return comments.data;
};

export const createComment = async (comment: Comment) => {
  const comments: AxiosResponse<Comment[], any> = await api.post(
    `${BASE_URL}`,
    comment
  );
  return comments.data;
};

export const updateComment = async (comment: Comment) => {
  const response: AxiosResponse<Comment, any> = await api.put(
    `${BASE_URL}/${comment._id}`,
    comment
  );
  return response.data;
};
