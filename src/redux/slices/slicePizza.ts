import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type FetchPizzaArgs = {
  currentPage: number, category: string, sortBy: string, order:string, search: string
}

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params: FetchPizzaArgs) => {

    const { currentPage, category, sortBy, order, search } = params
    const { data } = await axios.get<Pizza[]>(
      `https://64340e691c5ed06c958de2ee.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data as Pizza[]
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
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.status = 'loading'
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'succes'
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.status = 'error'
      state.items = []
    });

} })

export const selectPizza = (store: RootState) => store.pizza

export const { setItems } = slicePizza.actions

export default slicePizza.reducer
