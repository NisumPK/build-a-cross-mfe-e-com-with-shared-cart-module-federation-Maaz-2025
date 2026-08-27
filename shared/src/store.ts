import { configureStore } from '@reduxjs/toolkit'
import { cartReducer, normalizeCartState } from './cartSlice'
import {
  clearPersistedCart,
  loadCart,
  resolveLocalStorage,
  saveCart,
} from './cartStorage'
import type { CartState, StorageLike } from './types'

export interface CreateAppStoreOptions {
  storage?: StorageLike | null
  preloadedCart?: CartState
}

export const createAppStore = (options: CreateAppStoreOptions = {}) => {
  const storage =
    options.storage === undefined ? resolveLocalStorage() : options.storage
  const preloadedCart = options.preloadedCart
    ? normalizeCartState(options.preloadedCart.items)
    : loadCart(storage)

  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: preloadedCart,
    },
  })

  if (storage) {
    let previousCart = store.getState().cart
    store.subscribe(() => {
      const nextCart = store.getState().cart
      if (nextCart !== previousCart) {
        previousCart = nextCart
        if (nextCart.items.length === 0) clearPersistedCart(storage)
        else saveCart(nextCart, storage)
      }
    })
  }

  return store
}

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const selectCart = (state: RootState) => state.cart
export const selectCartItems = (state: RootState) => state.cart.items
export const selectTotalItems = (state: RootState) => state.cart.totalItems
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice
