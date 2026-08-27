import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createAppStore } from '@mfe/shared'
import CatalogApp from './CatalogApp'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Catalog root element was not found')

const standaloneStore = createAppStore()

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={standaloneStore}>
      <BrowserRouter>
        <CatalogApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
