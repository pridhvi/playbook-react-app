import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types";
import { login, signup, logout, updateUser } from "./usersServices";

export const signupThunk = createAsyncThunk(
  "users/signup",
  async (user: User) => {
    const currentUser: User = await signup(user);
    return currentUser;
  }
);

export const loginThunk = createAsyncThunk("users/login", async (user: any) => {
  const currentUser: User = await login(user);
  return currentUser;
});

export const logoutThunk = createAsyncThunk("users/logout", async () => {
  const response = await logout();
  return response;
});

export const updateUserThunk = createAsyncThunk("users/updateUser", async (user: User) => {
  const response = await updateUser(user);
  return response;
});