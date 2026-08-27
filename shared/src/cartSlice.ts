import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, CartState, Product } from './types'

export const emptyCartState = (): CartState => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
})

const calculateTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: Number(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
  ),
})

export const normalizeCartState = (items: CartItem[]): CartState => ({
  items,
  ...calculateTotals(items),
})

const recalculate = (state: CartState) => {
  const totals = calculateTotals(state.items)
  state.totalItems = totals.totalItems
  state.totalPrice = totals.totalPrice
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: emptyCartState(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      recalculate(state)
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((candidate) => candidate.id === action.payload)
      if (item) item.quantity += 1
      recalculate(state)
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((candidate) => candidate.id === action.payload)
      if (!item) return
      if (item.quantity === 1) {
        state.items = state.items.filter((candidate) => candidate.id !== action.payload)
      } else {
        item.quantity -= 1
      }
      recalculate(state)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      recalculate(state)
    },
    clearCart: () => emptyCartState(),
  },
})

export const { addToCart, incrementItem, decrementItem, removeItem, clearCart } =
  cartSlice.actions

export const cartReducer = cartSlice.reducer
