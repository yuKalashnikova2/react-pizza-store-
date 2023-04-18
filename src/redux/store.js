import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/sliceFilter'
import cart from './slices/sliceCart'

export const store = configureStore({
  reducer: {
    filter,
    cart
  },
})
