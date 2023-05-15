import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const slicePizza = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
})

export const { setItems } = slicePizza.actions

export default slicePizza.reducer
