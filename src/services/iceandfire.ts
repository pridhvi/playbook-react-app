import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book, Character, House } from '../types'

interface ListResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
}

export const iceAndFireApi = createApi({
  reducerPath: 'iceAndFireApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.anapioficeandfire.com/api' }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], any>({
      query: () => "/books",
    }),
    getAllCharacters: builder.query<Character[], any>({
      query: (page = 1) => `/characters?page=${page}&pageSize=50`,
    }),
    getCharacterByName: builder.query<Character[], any>({
      query: (name) => `/characters?name=${name}`,
    }),
    getAllHouses: builder.query<House[], any>({
      query: () => "/houses?page=1&pageSize=50",
    })
  }),
})

export const { 
  useGetAllBooksQuery,
  useGetAllCharactersQuery,
  useGetCharacterByNameQuery,
  useGetAllHousesQuery,
 } = iceAndFireApi