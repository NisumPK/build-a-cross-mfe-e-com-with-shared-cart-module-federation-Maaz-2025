export {
  addToCart,
  cartReducer,
  clearCart,
  decrementItem,
  emptyCartState,
  incrementItem,
  normalizeCartState,
  removeItem,
} from './cartSlice'
export {
  CART_STORAGE_KEY,
  clearPersistedCart,
  loadCart,
  resolveLocalStorage,
  saveCart,
} from './cartStorage'
export {
  type CreateAppStoreOptions,
  createAppStore,
  selectCart,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  type AppDispatch,
  type AppStore,
  type RootState,
} from './store'
export {
  RECENTLY_VIEWED_LIMIT,
  RECENTLY_VIEWED_STORAGE_KEY,
  clearRecentlyViewed,
  getRecentlyViewed,
  recordRecentlyViewed,
} from './recentProductStorage'
export {
  CURRENCY_COOKIE_KEY,
  DEFAULT_CURRENCY,
  SUPPORTED_CURRENCIES,
  formatCurrency,
  getCurrencyPreference,
  setCurrencyPreference,
} from './currencyCookie'
export {
  PRODUCT_QUERY_KEY,
  buildProductDetailsPath,
  buildProductSearch,
  getProductIdFromSearch,
} from './productQuery'
export {
  CART_ITEM_ADDED_EVENT,
  CURRENCY_CHANGED_EVENT,
  dispatchCartItemAdded,
  dispatchCurrencyChanged,
  subscribeToCartItemAdded,
  subscribeToCurrencyChanged,
} from './cartEvents'
export type {
  CartItem,
  CartItemAddedDetail,
  CartState,
  CurrencyChangedDetail,
  CurrencyCode,
  Product,
  RecentlyViewedProduct,
  StorageLike,
} from './types'
