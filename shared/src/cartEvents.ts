import type {
  CartItemAddedDetail,
  CurrencyChangedDetail,
  CurrencyCode,
} from './types'

export const CART_ITEM_ADDED_EVENT = 'cart:item-added'
export const CURRENCY_CHANGED_EVENT = 'currency:changed'

const resolveEventTarget = (): EventTarget | null =>
  typeof window === 'undefined' ? null : window

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isCartItemAddedDetail = (value: unknown): value is CartItemAddedDetail =>
  isRecord(value) &&
  typeof value.productId === 'string' &&
  typeof value.productName === 'string' &&
  typeof value.quantity === 'number' &&
  Number.isInteger(value.quantity) &&
  value.quantity > 0

const isCurrencyChangedDetail = (value: unknown): value is CurrencyChangedDetail =>
  isRecord(value) &&
  (value.currency === 'USD' || value.currency === 'EUR' || value.currency === 'GBP')

export const dispatchCartItemAdded = (
  detail: CartItemAddedDetail,
  target: EventTarget | null = resolveEventTarget(),
) => {
  if (!target) return false
  target.dispatchEvent(new CustomEvent<CartItemAddedDetail>(CART_ITEM_ADDED_EVENT, { detail }))
  return true
}

export const subscribeToCartItemAdded = (
  listener: (detail: CartItemAddedDetail) => void,
  target: EventTarget | null = resolveEventTarget(),
) => {
  if (!target) return () => undefined
  const eventListener: EventListener = (event) => {
    const detail: unknown = (event as CustomEvent<unknown>).detail
    if (isCartItemAddedDetail(detail)) listener(detail)
  }
  target.addEventListener(CART_ITEM_ADDED_EVENT, eventListener)
  return () => target.removeEventListener(CART_ITEM_ADDED_EVENT, eventListener)
}

export const dispatchCurrencyChanged = (
  currency: CurrencyCode,
  target: EventTarget | null = resolveEventTarget(),
) => {
  if (!target) return false
  const detail: CurrencyChangedDetail = { currency }
  target.dispatchEvent(
    new CustomEvent<CurrencyChangedDetail>(CURRENCY_CHANGED_EVENT, { detail }),
  )
  return true
}

export const subscribeToCurrencyChanged = (
  listener: (detail: CurrencyChangedDetail) => void,
  target: EventTarget | null = resolveEventTarget(),
) => {
  if (!target) return () => undefined
  const eventListener: EventListener = (event) => {
    const detail: unknown = (event as CustomEvent<unknown>).detail
    if (isCurrencyChangedDetail(detail)) listener(detail)
  }
  target.addEventListener(CURRENCY_CHANGED_EVENT, eventListener)
  return () => target.removeEventListener(CURRENCY_CHANGED_EVENT, eventListener)
}
