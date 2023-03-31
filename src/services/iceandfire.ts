import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const iceAndFireApi = createApi({
  reducerPath: 'iceAndFireApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.anapioficeandfire.com/api' }),
  endpoints: (builder) => ({
    getCategories: builder.query<any, string>({
      query: () => "/",
    }),
  }),
})

export const { useGetCategoriesQuery } = iceAndFireApi