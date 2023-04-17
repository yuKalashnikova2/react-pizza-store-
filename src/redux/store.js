import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/sliceFilter'

export const store = configureStore({
  reducer: {
    filter,
  },
})
