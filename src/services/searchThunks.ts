import { SearchResult } from "../types";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const IGDB_API_URL = "http://localhost:4000/api/igdb";
const IGDB_API_URL = process.env.IGDB_API_BASE;

export const searchCriteriaThunk = createAsyncThunk<
SearchResult[],
  {
    keyword: string;
    pageSize: number;
    pageNumber: number;
  }
>("search/getSearchCriteria", async ({ keyword, pageSize, pageNumber }) => {
  // calculate the element to start with for the next page
  pageNumber = pageSize * (pageNumber) + 1;
  const searchResult = await axios.get(
    `${IGDB_API_URL}/search?keyword=${keyword}&pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
  return searchResult.data as SearchResult[];
});
