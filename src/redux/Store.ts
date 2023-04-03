import { configureStore } from '@reduxjs/toolkit'
import searchResultReducer from './searchResultReducer'
import gamesReducer from './gamesReducer'

export const store = configureStore({
  reducer: {
    searchData: searchResultReducer,
    gamesData: gamesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
