import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params) => {
    // @ts-ignore
    const { currentPage, category, sortBy, order, search } = params
    const { data } = await axios.get(
      `https://64340e691c5ed06c958de2ee.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

type Pizza = {
  id: string; title: string; types: number; price: number; size: number; imageUrl: string; count: number;
}

interface PizzaSliceState {
  items: Pizza[],
  status: 'loading' | 'succes' | 'error',
}

const initialState: PizzaSliceState = {
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
    // @ts-ignore
    [fetchPizza.pending]: (state, action) => {
      state.status = 'loading'
    },
    // @ts-ignore
    [fetchPizza.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },
    // @ts-ignore
    [fetchPizza.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []
    },
  },
})

export const selectPizza = (store: RootState) => store.pizza

export const { setItems } = slicePizza.actions

export default slicePizza.reducer
