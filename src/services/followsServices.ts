import axios from "axios";
// const BASE_URL = "http://localhost:4000/api/follows";
const BASE_URL = "https://playbook-node-server.onrender.com/api/follows";

const api = axios.create({
  withCredentials: true,
});

export const getAllFollowsByMasterUser = async (masterUser: string) => {
  const response = await api.get(`${BASE_URL}/followers/${masterUser}`);
  return response.data;
};

export const getAllFollowsByFollowingUser = async (followingUser: string) => {
  const response = await api.get(`${BASE_URL}/following/${followingUser}`);
  return response.data;
};

export const createFollow = async (
  masterUser: string,
  followingUser: string
) => {
  const response = await api.post(`${BASE_URL}/${masterUser}/${followingUser}`);
  return response.data;
};

export const deleteFollow = async (
  masterUser: string,
  followingUser: string
) => {
  const response = await api.delete(
    `${BASE_URL}/${masterUser}/${followingUser}`
  );
  return response.data;
};
