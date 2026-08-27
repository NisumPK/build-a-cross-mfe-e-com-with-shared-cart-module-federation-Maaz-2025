export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface RecentlyViewedProduct extends Product {
  viewedAt: string
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP'

export interface CartItemAddedDetail {
  productId: string
  productName: string
  quantity: number
}

export interface CurrencyChangedDetail {
  currency: CurrencyCode
}

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}
