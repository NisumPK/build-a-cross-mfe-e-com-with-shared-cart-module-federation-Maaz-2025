import {
  addToCart,
  clearCart,
  createAppStore,
  decrementItem,
  incrementItem,
  removeItem,
  type Product,
} from './index'

const product: Product = {
  id: 'test-product',
  name: 'Test Product',
  price: 19.95,
  image: '/test.svg',
  description: 'A product used by the shared cart tests.',
}

describe('shared cart state', () => {
  it('adds a product once and derives totals from cart items', () => {
    const store = createAppStore({ storage: null })

    store.dispatch(addToCart(product))

    expect(store.getState().cart).toEqual({
      items: [{ ...product, quantity: 1 }],
      totalItems: 1,
      totalPrice: 19.95,
    })
  })

  it('increments an existing product instead of adding a duplicate row', () => {
    const store = createAppStore({ storage: null })

    store.dispatch(addToCart(product))
    store.dispatch(addToCart(product))
    store.dispatch(incrementItem(product.id))

    expect(store.getState().cart.items).toHaveLength(1)
    expect(store.getState().cart.items[0]?.quantity).toBe(3)
    expect(store.getState().cart.totalItems).toBe(3)
    expect(store.getState().cart.totalPrice).toBe(59.85)
  })

  it('decrements quantities and removes the row when quantity reaches zero', () => {
    const store = createAppStore({ storage: null })
    store.dispatch(addToCart(product))
    store.dispatch(addToCart(product))

    store.dispatch(decrementItem(product.id))
    expect(store.getState().cart.items[0]?.quantity).toBe(1)

    store.dispatch(decrementItem(product.id))
    expect(store.getState().cart.items).toEqual([])
    expect(store.getState().cart.totalPrice).toBe(0)
  })

  it('supports remove and clear operations', () => {
    const store = createAppStore({ storage: null })
    const second = { ...product, id: 'second', price: 10 }
    store.dispatch(addToCart(product))
    store.dispatch(addToCart(second))

    store.dispatch(removeItem(product.id))
    expect(store.getState().cart.items.map((item) => item.id)).toEqual(['second'])

    store.dispatch(clearCart())
    expect(store.getState().cart).toEqual({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    })
  })
})
