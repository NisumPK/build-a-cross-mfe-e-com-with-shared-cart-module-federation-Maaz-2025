import {
  CART_ITEM_ADDED_EVENT,
  CART_STORAGE_KEY,
  RECENTLY_VIEWED_STORAGE_KEY,
  addToCart,
  buildProductDetailsPath,
  buildProductSearch,
  clearCart,
  createAppStore,
  dispatchCartItemAdded,
  getCurrencyPreference,
  getProductIdFromSearch,
  getRecentlyViewed,
  loadCart,
  recordRecentlyViewed,
  setCurrencyPreference,
  subscribeToCartItemAdded,
  type Product,
  type StorageLike,
} from './index'

const product: Product = {
  id: 'browser-product',
  name: 'Browser Product',
  price: 12.5,
  image: '/browser.svg',
  description: 'Used to exercise browser sharing adapters.',
}

const createMemoryStorage = (initial: Record<string, string> = {}) => {
  const values = new Map(Object.entries(initial))
  const storage: StorageLike = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
  return { storage, values }
}

describe('browser data-sharing adapters', () => {
  it('persists cart changes, rehydrates safely, and clears persisted data', () => {
    const { storage, values } = createMemoryStorage()
    const firstStore = createAppStore({ storage })

    firstStore.dispatch(addToCart(product))
    expect(values.has(CART_STORAGE_KEY)).toBe(true)

    const restoredStore = createAppStore({ storage })
    expect(restoredStore.getState().cart.items[0]).toMatchObject({
      id: product.id,
      quantity: 1,
    })
    expect(restoredStore.getState().cart.totalPrice).toBe(product.price)

    restoredStore.dispatch(clearCart())
    expect(values.has(CART_STORAGE_KEY)).toBe(false)
  })

  it('falls back to an empty cart for malformed localStorage data', () => {
    const { storage } = createMemoryStorage({ [CART_STORAGE_KEY]: '{not-json' })
    expect(loadCart(storage)).toEqual({ items: [], totalItems: 0, totalPrice: 0 })
  })

  it('keeps a unique, newest-first recently-viewed list in sessionStorage', () => {
    const { storage, values } = createMemoryStorage()
    const second = { ...product, id: 'second', name: 'Second' }

    recordRecentlyViewed(product, storage)
    recordRecentlyViewed(second, storage)
    recordRecentlyViewed(product, storage)

    expect(getRecentlyViewed(storage).map((item) => item.id)).toEqual([
      product.id,
      second.id,
    ])
    expect(values.has(RECENTLY_VIEWED_STORAGE_KEY)).toBe(true)
  })

  it('writes and reads the supported currency cookie with a safe default', () => {
    const cookieTarget = { cookie: '' }
    expect(getCurrencyPreference('')).toBe('USD')
    expect(setCurrencyPreference('EUR', cookieTarget)).toBe(true)
    expect(getCurrencyPreference(cookieTarget.cookie)).toBe('EUR')
    expect(getCurrencyPreference('mfe_currency=XYZ')).toBe('USD')
  })

  it('builds and parses bookmarkable product query parameters', () => {
    expect(buildProductDetailsPath('a product')).toBe('/catalog?productId=a+product')
    expect(getProductIdFromSearch('?sort=new&productId=abc')).toBe('abc')
    expect(buildProductSearch(null, '?productId=abc&sort=new')).toBe('?sort=new')
  })

  it('delivers and cleans up CustomEvent notifications without changing state', () => {
    const target = new EventTarget()
    const listener = vi.fn()
    const unsubscribe = subscribeToCartItemAdded(listener, target)
    const detail = { productId: product.id, productName: product.name, quantity: 1 }

    expect(dispatchCartItemAdded(detail, target)).toBe(true)
    expect(listener).toHaveBeenCalledWith(detail)

    target.dispatchEvent(
      new CustomEvent(CART_ITEM_ADDED_EVENT, { detail: { productId: 42 } }),
    )
    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
    target.dispatchEvent(new CustomEvent(CART_ITEM_ADDED_EVENT, { detail }))
    expect(listener).toHaveBeenCalledTimes(1)
  })
})
