import { configureStore } from '@reduxjs/toolkit'
import searchResultReducer from './searchResultReducer'

export const store = configureStore({
  reducer: {
    searchData: searchResultReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
