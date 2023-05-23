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

enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error'
}

interface PizzaSliceState {
  items: Pizza[],
  status: Status,
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
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
      state.status = Status.LOADING
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCES
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.status = Status.ERROR
      state.items = []
    });

} })

export const selectPizza = (store: RootState) => store.pizza

export const { setItems } = slicePizza.actions

export default slicePizza.reducer
