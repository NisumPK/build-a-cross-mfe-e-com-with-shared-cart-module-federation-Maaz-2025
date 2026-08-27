import '@testing-library/jest-dom/vitest'

afterEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
  document.cookie = 'mfe_currency=; Max-Age=0; Path=/'
})
