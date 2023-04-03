import { configureStore } from '@reduxjs/toolkit'
import searchResultReducer from './searchResultReducer'
import gameReducer from './gameReducer'

export const store = configureStore({
  reducer: {
    searchData: searchResultReducer,
    gameData: gameReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
