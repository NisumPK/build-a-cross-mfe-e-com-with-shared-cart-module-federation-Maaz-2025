export const PRODUCT_QUERY_KEY = 'productId'

export const getProductIdFromSearch = (search: string): string | null =>
  new URLSearchParams(search).get(PRODUCT_QUERY_KEY)

export const buildProductSearch = (
  productId: string | null,
  currentSearch = '',
) => {
  const search = new URLSearchParams(currentSearch)
  if (productId) search.set(PRODUCT_QUERY_KEY, productId)
  else search.delete(PRODUCT_QUERY_KEY)
  const query = search.toString()
  return query ? `?${query}` : ''
}

export const buildProductDetailsPath = (productId: string) =>
  `/catalog${buildProductSearch(productId)}`
