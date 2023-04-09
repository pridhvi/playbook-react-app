import axios, { AxiosResponse } from "axios";
import { User } from "../types";
// const BASE_URL = "http://localhost:4000/api/users";
const BASE_URL = "https://playbook-node-server.onrender.com/api/users";

const api = axios.create({
  withCredentials: true,
});

export const signup = async (user: User) => {
  const newUser: AxiosResponse<User, any> = await api.post(
    `${BASE_URL}/signup`,
    user
  );
  return newUser.data;
};

export const login = async (user: User) => {
  const newUser: AxiosResponse<User, any> = await api.post(
    `${BASE_URL}/login`,
    user
  );
  return newUser.data;
};

export const logout = async () => {
  const response = await api.post(`${BASE_URL}/logout`);
  return response.data;
};

export const profile = () =>
  api.post(`${BASE_URL}/profile`).then((response) => response.data);

export const isUser = async (username: string) => {
  const response = await api.get(`${BASE_URL}/isUser/${username}`);
  return response.data;
};
