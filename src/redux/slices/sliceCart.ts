import { createSlice } from '@reduxjs/toolkit'


type CartItem = {
   id: string; title: string; types: number; price: number; size: number; imageUrl: string; count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItem[]
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
}

export const sliceCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0
    },
  },
})
export const selectCart = (store:any) => store.cart ;

// @ts-ignore
export const selectCartItemById = (id: string) => (store: any) => store.cart.items.find(obj => obj.id === id)


export const { addItem, removeItem, minusItem, clearItems } = sliceCart.actions

export default sliceCart.reducer
