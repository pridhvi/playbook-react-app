import { configureStore } from '@reduxjs/toolkit'
import searchResultReducer from './searchResultReducer'
import gamesReducer from './gamesReducer'
import platformsReducer from './platformsReducer'

export const store = configureStore({
  reducer: {
    searchData: searchResultReducer,
    gamesData: gamesReducer,
    platformsData: platformsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
