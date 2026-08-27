import type { Product, RecentlyViewedProduct, StorageLike } from './types'

export const RECENTLY_VIEWED_STORAGE_KEY = 'mfe:recently-viewed'
export const RECENTLY_VIEWED_LIMIT = 5

const resolveSessionStorage = (): StorageLike | null => {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage
  } catch {
    return null
  }
}

const isRecentlyViewed = (value: unknown): value is RecentlyViewedProduct => {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.price === 'number' &&
    Number.isFinite(candidate.price) &&
    typeof candidate.image === 'string' &&
    typeof candidate.description === 'string' &&
    typeof candidate.viewedAt === 'string'
  )
}

export const getRecentlyViewed = (
  storage: StorageLike | null = resolveSessionStorage(),
): RecentlyViewedProduct[] => {
  if (!storage) return []
  try {
    const serialized = storage.getItem(RECENTLY_VIEWED_STORAGE_KEY)
    if (!serialized) return []
    const candidate: unknown = JSON.parse(serialized)
    return Array.isArray(candidate) && candidate.every(isRecentlyViewed)
      ? candidate.slice(0, RECENTLY_VIEWED_LIMIT)
      : []
  } catch {
    return []
  }
}

export const recordRecentlyViewed = (
  product: Product,
  storage: StorageLike | null = resolveSessionStorage(),
): RecentlyViewedProduct[] => {
  const nextEntry = { ...product, viewedAt: new Date().toISOString() }
  const nextItems = [
    nextEntry,
    ...getRecentlyViewed(storage).filter((item) => item.id !== product.id),
  ].slice(0, RECENTLY_VIEWED_LIMIT)

  try {
    storage?.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(nextItems))
  } catch {
    // Browsers can deny storage access; the feature then remains in-memory only.
  }
  return nextItems
}

export const clearRecentlyViewed = (
  storage: StorageLike | null = resolveSessionStorage(),
) => {
  try {
    storage?.removeItem(RECENTLY_VIEWED_STORAGE_KEY)
  } catch {
    // Clearing temporary history is best-effort.
  }
}
