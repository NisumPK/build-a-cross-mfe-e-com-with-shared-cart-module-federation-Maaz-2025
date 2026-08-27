import type { CurrencyCode } from './types'

export const CURRENCY_COOKIE_KEY = 'mfe_currency'
export const DEFAULT_CURRENCY: CurrencyCode = 'USD'
export const SUPPORTED_CURRENCIES: CurrencyCode[] = ['USD', 'EUR', 'GBP']

interface CookieTarget {
  cookie: string
}

const resolveCookieTarget = (): CookieTarget | null =>
  typeof document === 'undefined' ? null : document

export const getCurrencyPreference = (
  cookieString = resolveCookieTarget()?.cookie ?? '',
): CurrencyCode => {
  const encodedValue = cookieString
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CURRENCY_COOKIE_KEY}=`))
    ?.slice(CURRENCY_COOKIE_KEY.length + 1)

  if (!encodedValue) return DEFAULT_CURRENCY

  try {
    const value = decodeURIComponent(encodedValue)
    return SUPPORTED_CURRENCIES.includes(value as CurrencyCode)
      ? (value as CurrencyCode)
      : DEFAULT_CURRENCY
  } catch {
    return DEFAULT_CURRENCY
  }
}

export const setCurrencyPreference = (
  currency: CurrencyCode,
  cookieTarget: CookieTarget | null = resolveCookieTarget(),
) => {
  if (!cookieTarget || !SUPPORTED_CURRENCIES.includes(currency)) return false
  const maxAge = 60 * 60 * 24 * 30
  cookieTarget.cookie = `${CURRENCY_COOKIE_KEY}=${encodeURIComponent(currency)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`
  return true
}

export const formatCurrency = (amount: number, currency: CurrencyCode) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
