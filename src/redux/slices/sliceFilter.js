import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchInput: '',
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  currentPage: 1,
}

export const sliceFilter = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSearchInput(state, action) {
      state.searchInput = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})

export const selectFilter = (store) => store.filter

export const selectSort = (store) => store.filter.sort
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchInput,
} = sliceFilter.actions

export default sliceFilter.reducer
