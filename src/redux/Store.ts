import { configureStore } from '@reduxjs/toolkit'
import searchResultReducer from './searchResultReducer'
import gamesReducer from './gamesReducer'
import platformsReducer from './platformsReducer'
import charactersReducer from './charactersReducer'

export const store = configureStore({
  reducer: {
    searchData: searchResultReducer,
    gamesData: gamesReducer,
    charactersData: charactersReducer,
    platformsData: platformsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
