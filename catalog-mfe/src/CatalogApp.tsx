import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  PRODUCT_QUERY_KEY,
  SUPPORTED_CURRENCIES,
  addToCart,
  buildProductDetailsPath,
  dispatchCartItemAdded,
  dispatchCurrencyChanged,
  formatCurrency,
  getCurrencyPreference,
  getRecentlyViewed,
  recordRecentlyViewed,
  setCurrencyPreference,
  type AppDispatch,
  type CurrencyCode,
  type Product,
  type RecentlyViewedProduct,
} from '@mfe/shared'
import { findProduct, products } from './products'
import './catalog.css'

interface ProductCardProps {
  product: Product
  currency: CurrencyCode
  onAdd(product: Product): void
  onView(product: Product): void
}

const ProductCard = ({ product, currency, onAdd, onView }: ProductCardProps) => (
  <article className="catalog-card" data-testid={`product-${product.id}`}>
    <img className="catalog-card__image" src={product.image} alt="" />
    <div className="catalog-card__content">
      <p className="catalog-card__eyebrow">Northstar select</p>
      <h3>{product.name}</h3>
      <p className="catalog-card__description">{product.description}</p>
      <strong className="catalog-card__price">
        {formatCurrency(product.price, currency)}
      </strong>
      <div className="catalog-card__actions">
        <button className="catalog-button catalog-button--secondary" onClick={() => onView(product)}>
          View details
        </button>
        <button className="catalog-button" onClick={() => onAdd(product)}>
          Add to cart
        </button>
      </div>
    </div>
  </article>
)

interface ProductDetailsProps extends ProductCardProps {
  onClose(): void
}

const ProductDetails = ({ product, currency, onAdd, onClose }: ProductDetailsProps) => (
  <section className="catalog-details" aria-labelledby="catalog-details-title">
    <img className="catalog-details__image" src={product.image} alt="" />
    <div>
      <p className="catalog-kicker">Product details</p>
      <h2 id="catalog-details-title">{product.name}</h2>
      <p>{product.description}</p>
      <strong className="catalog-details__price">
        {formatCurrency(product.price, currency)}
      </strong>
      <div className="catalog-details__actions">
        <button className="catalog-button" onClick={() => onAdd(product)}>
          Add to cart
        </button>
        <button className="catalog-button catalog-button--secondary" onClick={onClose}>
          Back to products
        </button>
      </div>
    </div>
  </section>
)

const CatalogApp = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [currency, setCurrency] = useState<CurrencyCode>(() => getCurrencyPreference())
  const selectedId = searchParams.get(PRODUCT_QUERY_KEY)
  const selectedProduct = findProduct(selectedId)
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>(() =>
    selectedProduct ? recordRecentlyViewed(selectedProduct) : getRecentlyViewed(),
  )

  const viewProduct = (product: Product) => {
    setRecentlyViewed(recordRecentlyViewed(product))
    navigate(buildProductDetailsPath(product.id))
  }

  const closeDetails = () => {
    const next = new URLSearchParams(searchParams)
    next.delete(PRODUCT_QUERY_KEY)
    setSearchParams(next)
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    dispatchCartItemAdded({
      productId: product.id,
      productName: product.name,
      quantity: 1,
    })
  }

  const changeCurrency = (nextCurrency: CurrencyCode) => {
    setCurrency(nextCurrency)
    setCurrencyPreference(nextCurrency)
    dispatchCurrencyChanged(nextCurrency)
  }

  return (
    <section className="catalog-shell" aria-labelledby="catalog-title">
      <header className="catalog-heading">
        <div>
          <p className="catalog-kicker">Independent catalog MFE</p>
          <h1 id="catalog-title">Useful things, thoughtfully chosen.</h1>
          <p>Browse the collection, open a bookmarkable detail view, and add items to the shared cart.</p>
        </div>
        <label className="catalog-currency">
          Display currency
          <select
            aria-label="Display currency"
            value={currency}
            onChange={(event) => changeCurrency(event.target.value as CurrencyCode)}
          >
            {SUPPORTED_CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      </header>

      {selectedId && !selectedProduct ? (
        <section className="catalog-not-found" role="status">
          <h2>Product not found</h2>
          <p>The product in this URL is no longer in the catalog.</p>
          <button className="catalog-button" onClick={closeDetails}>
            Browse all products
          </button>
        </section>
      ) : selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          currency={currency}
          onAdd={handleAddToCart}
          onView={viewProduct}
          onClose={closeDetails}
        />
      ) : (
        <div className="catalog-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onAdd={handleAddToCart}
              onView={viewProduct}
            />
          ))}
        </div>
      )}

      {recentlyViewed.length > 0 && (
        <aside className="catalog-recent" aria-labelledby="recent-title">
          <div>
            <p className="catalog-kicker">This tab only</p>
            <h2 id="recent-title">Recently viewed</h2>
          </div>
          <div className="catalog-recent__items">
            {recentlyViewed.map((product) => (
              <button key={product.id} onClick={() => viewProduct(product)}>
                <img src={product.image} alt="" />
                <span>{product.name}</span>
              </button>
            ))}
          </div>
        </aside>
      )}
    </section>
  )
}

export default CatalogApp
