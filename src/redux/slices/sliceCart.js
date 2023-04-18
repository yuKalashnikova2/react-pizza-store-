import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: []
}

export const sliceCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0)
    },
    removeItem(state, action) {
       state.items =  state.items.filter(obj => obj.id !== action.payload)
    },
    clearItems(state, action) {
        state.items = []
    }
  },
})

export const { addItem, removeItem,clearItems } = sliceCart.actions

export default sliceCart.reducer
