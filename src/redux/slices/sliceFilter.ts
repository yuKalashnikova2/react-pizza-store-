import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type SortType = {
  name: string,
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price',
}

interface FilterSliceState {
  searchInput: string,
  sort: SortType,
  currentPage: number,
  categoryId: number,
}

const initialState: FilterSliceState = {
  searchInput: '',
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  currentPage: 1,
  categoryId: 0,
  
}

export const sliceFilter = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})

export const selectFilter = (store: RootState) => store.filter

export const selectSort = (store: RootState) => store.filter.sort
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchInput,
} = sliceFilter.actions

export default sliceFilter.reducer
