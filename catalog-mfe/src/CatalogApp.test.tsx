import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import {
  CART_ITEM_ADDED_EVENT,
  RECENTLY_VIEWED_STORAGE_KEY,
  createAppStore,
} from '@mfe/shared'
import CatalogApp from './CatalogApp'
import { products } from './products'

const renderCatalog = (initialEntry = '/catalog') => {
  const store = createAppStore({ storage: null })
  const result = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <CatalogApp />
      </MemoryRouter>
    </Provider>,
  )
  return { ...result, store }
}

describe('CatalogApp', () => {
  it('renders at least eight complete products', () => {
    renderCatalog()

    expect(screen.getAllByTestId(/^product-/)).toHaveLength(8)
    for (const product of products) {
      expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument()
      expect(screen.getByText(product.description)).toBeInTheDocument()
    }
  })

  it('adds exactly one item through Redux and emits a notification event', async () => {
    const user = userEvent.setup()
    const listener = vi.fn()
    window.addEventListener(CART_ITEM_ADDED_EVENT, listener)
    const { store } = renderCatalog()

    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[0]!)

    expect(store.getState().cart.totalItems).toBe(1)
    expect(store.getState().cart.items[0]?.id).toBe(products[0]?.id)
    expect(listener).toHaveBeenCalledTimes(1)
    expect((listener.mock.calls[0]?.[0] as CustomEvent).detail).toMatchObject({
      productId: products[0]?.id,
      productName: products[0]?.name,
      quantity: 1,
    })
    window.removeEventListener(CART_ITEM_ADDED_EVENT, listener)
  })

  it('opens product details from a bookmarkable query and records the view for the tab', async () => {
    const user = userEvent.setup()
    const selected = products[1]!
    renderCatalog(`/catalog?productId=${selected.id}`)

    expect(screen.getByRole('heading', { name: selected.name })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back to products' })).toBeInTheDocument()
    await waitFor(() =>
      expect(window.sessionStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY)).toContain(
        selected.id,
      ),
    )
    expect(screen.getByRole('heading', { name: 'Recently viewed' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Back to products' }))
    expect(screen.getByRole('button', { name: selected.name })).toBeInTheDocument()
  })

  it('shows a recoverable state for an unknown product id', async () => {
    const user = userEvent.setup()
    renderCatalog('/catalog?productId=missing')

    expect(screen.getByRole('heading', { name: 'Product not found' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Browse all products' }))
    expect(screen.getAllByTestId(/^product-/)).toHaveLength(8)
  })

  it('stores the selected currency as a cookie', async () => {
    const user = userEvent.setup()
    renderCatalog()

    await user.selectOptions(screen.getByLabelText('Display currency'), 'GBP')

    expect(document.cookie).toContain('mfe_currency=GBP')
  })
})
