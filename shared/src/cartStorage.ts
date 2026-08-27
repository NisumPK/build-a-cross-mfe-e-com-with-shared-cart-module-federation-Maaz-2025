import { emptyCartState, normalizeCartState } from './cartSlice'
import type { CartItem, CartState, StorageLike } from './types'

export const CART_STORAGE_KEY = 'mfe:cart'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isCartItem = (value: unknown): value is CartItem => {
  if (!isRecord(value)) return false
  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    typeof value.image === 'string' &&
    typeof value.description === 'string' &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  )
}

export const resolveLocalStorage = (): StorageLike | null => {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

export const loadCart = (
  storage: StorageLike | null = resolveLocalStorage(),
): CartState => {
  if (!storage) return emptyCartState()

  try {
    const serialized = storage.getItem(CART_STORAGE_KEY)
    if (!serialized) return emptyCartState()
    const candidate: unknown = JSON.parse(serialized)
    if (!isRecord(candidate) || !Array.isArray(candidate.items)) return emptyCartState()
    if (!candidate.items.every(isCartItem)) return emptyCartState()
    return normalizeCartState(candidate.items)
  } catch {
    return emptyCartState()
  }
}

export const saveCart = (
  cart: CartState,
  storage: StorageLike | null = resolveLocalStorage(),
) => {
  if (!storage) return false

  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    return true
  } catch {
    return false
  }
}

export const clearPersistedCart = (
  storage: StorageLike | null = resolveLocalStorage(),
) => {
  if (!storage) return false

  try {
    storage.removeItem(CART_STORAGE_KEY)
    return true
  } catch {
    return false
  }
}
