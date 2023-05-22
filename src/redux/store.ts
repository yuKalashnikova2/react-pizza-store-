import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/sliceFilter'
import cart from './slices/sliceCart'
import pizza from './slices/slicePizza'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
})


export type RootState = ReturnType<typeof store.getState>