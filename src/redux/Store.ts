import { configureStore } from '@reduxjs/toolkit'
import gamesReducer from './gamesReducer'

export const store = configureStore({
  reducer: {
    gamesData: gamesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
