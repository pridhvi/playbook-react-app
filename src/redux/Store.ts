import { configureStore } from '@reduxjs/toolkit'
import searchResultReducer from './searchResultReducer'
import gamesReducer from './gamesReducer'
import charactersReducer from './charactersReducer'
import currentUserReducer from './currentUserReducer'

export const store = configureStore({
  reducer: {
    searchData: searchResultReducer,
    gamesData: gamesReducer,
    charactersData: charactersReducer,
    currentUserData: currentUserReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
