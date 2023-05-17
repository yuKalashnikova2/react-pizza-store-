import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params
    const { data } = await axios.get(
      `https://64340e691c5ed06c958de2ee.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

const initialState = {
  items: [],
  status: 'loading',
}

export const slicePizza = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchPizza.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },
    [fetchPizza.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []
    },
  },
})

export const { setItems } = slicePizza.actions

export default slicePizza.reducer
