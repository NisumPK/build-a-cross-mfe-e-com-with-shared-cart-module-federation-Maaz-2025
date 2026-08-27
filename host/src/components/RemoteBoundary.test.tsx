import { lazy } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RemoteBoundary } from './RemoteBoundary'

describe('RemoteBoundary', () => {
  it('shows a loading state while a federated component is resolving', () => {
    const PendingRemote = lazy(
      () => new Promise<{ default: () => null }>(() => undefined),
    )

    render(
      <RemoteBoundary name="Catalog" resetKey="catalog-loading">
        <PendingRemote />
      </RemoteBoundary>,
    )

    expect(screen.getByRole('status').textContent).toContain('Loading catalog')
  })

  it('contains a remote render failure and shows an actionable fallback', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const BrokenRemote = () => {
      throw new Error('Remote unavailable')
    }

    render(
      <RemoteBoundary name="Cart" resetKey="cart-error">
        <BrokenRemote />
      </RemoteBoundary>,
    )

    expect(screen.getByRole('alert').textContent).toContain(
      'Cart is temporarily unavailable',
    )
    expect(screen.getByRole('button', { name: 'Reload page' })).not.toBeNull()
    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })
})
