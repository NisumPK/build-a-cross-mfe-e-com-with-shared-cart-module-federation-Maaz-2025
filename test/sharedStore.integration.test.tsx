import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createAppStore } from '@mfe/shared'
import CatalogApp from '../catalog-mfe/src/CatalogApp'
import CartApp from '../cart-mfe/src/CartApp'
import { Header } from '../host/src/components/Header'

describe('host-owned shared Redux integration', () => {
  it('updates Catalog, Cart, and host badge through the exact same store', async () => {
    const user = userEvent.setup()
    const store = createAppStore({ storage: null })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Header />
          <CatalogApp />
          <CartApp compact />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByLabelText('0 items in cart')).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[0]!)

    expect(store.getState().cart.totalItems).toBe(1)
    expect(store.getState().cart.items).toHaveLength(1)
    expect(store.getState().cart.items[0]?.quantity).toBe(1)
    expect(screen.getByLabelText('1 item in cart')).toHaveTextContent('1')
    expect(screen.getByTestId('cart-total-items')).toHaveTextContent('1')
    expect(
      await screen.findByText(`${store.getState().cart.items[0]?.name} was added to the cart.`),
    ).toBeInTheDocument()
  })
})
