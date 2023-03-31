import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { iceAndFireApi } from '../services/iceandfire'

export const store = configureStore({
  reducer: {
    [iceAndFireApi.reducerPath]: iceAndFireApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(iceAndFireApi.middleware),
})

setupListeners(store.dispatch)