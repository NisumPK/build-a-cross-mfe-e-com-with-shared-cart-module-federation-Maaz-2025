# Screenshot and Demo Evidence Guide

This directory is reserved for real Assignment 2 evidence. Do not add placeholder images, generated DevTools views, or claims that a screenshot exists before manually capturing the running application.

The eight filenames below correspond directly to the eight screenshot/demo requirements in the official brief.

## Before Capturing

1. From the repository root, install and verify the workspaces:

   ~~~bash
   npm install
   npm run verify
   ~~~

2. Start the complete development system:

   ~~~bash
   npm run dev
   ~~~

3. Open <code>http://localhost:5000</code> in a desktop browser.
4. Install/enable Redux DevTools for the final state capture.
5. Open DevTools and use the Application and Console panels where required.
6. For a clean evidence sequence, clear only these assignment values before starting:

   - Local storage: <code>mfe:cart</code>
   - Session storage: <code>mfe:recently-viewed</code>
   - Cookie: <code>mfe_currency</code>

7. Reload the Host and keep private account data, unrelated tabs, bookmarks, extensions, tokens, and unrelated storage out of every capture.
8. Capture the browser address bar when the URL is part of the evidence. Capture enough UI context to prove the value belongs to this application.

Do not clear unrelated browser data. The steps above identify the exact assignment-owned keys.

## 1. Catalog Listing and Add to Cart

**Filename:** <code>01-catalog-product-listing.png</code>

1. Open <code>http://localhost:5000/catalog</code>.
2. Ensure the listing visibly contains the required product information: name, price, image, description, and Add to Cart control.
3. If all eight products cannot fit legibly in one viewport, zoom out modestly or use a full-page browser capture.
4. Capture the listing with at least one Add to Cart button clearly visible.

The evidence should demonstrate a federated Catalog rendered by the Host, not only the standalone port-5001 page.

## 2. Cart Quantity and Totals

**Filename:** <code>02-cart-quantity-total.png</code>

1. Add at least two different products.
2. Increment one product so its quantity is greater than one.
3. Open <code>http://localhost:5000/cart</code>.
4. Capture item names, unit prices, quantities, increment/decrement controls, remove controls, total item count, total price, and Clear Cart.
5. Verify the displayed arithmetic before capturing.

Do not manually alter Redux state to create this screenshot; use the application controls.

## 3. localStorage Cart Persistence

**Filename:** <code>03-local-storage-cart.png</code>

1. Keep at least one item in the cart.
2. Refresh the Host and confirm the cart/badge remains populated.
3. Open DevTools → Application → Local Storage → <code>http://localhost:5000</code>.
4. Select <code>mfe:cart</code>.
5. Capture the key and a readable value together with enough application UI to identify the project.

Avoid exposing unrelated local-storage entries. The capture should demonstrate persistence after a real refresh.

## 4. sessionStorage Recently Viewed Product

**Filename:** <code>04-session-storage-recently-viewed.png</code>

1. Open a product detail through the Catalog UI.
2. In the same tab, open DevTools → Application → Session Storage → <code>http://localhost:5000</code>.
3. Select <code>mfe:recently-viewed</code>.
4. Capture the key/value and the corresponding product detail or recently viewed UI.
5. Optionally refresh first to show that it remains during the tab session.

Do not close the tab between viewing the product and capturing this session-scoped evidence.

## 5. Currency Cookie

**Filename:** <code>05-cookie-currency.png</code>

1. Use the Catalog currency preference control so Catalog writes the cookie.
2. Open Cart and confirm it reads/displays the selected preference.
3. Open DevTools → Application → Cookies → the Host origin.
4. Locate <code>mfe_currency</code>.
5. Capture its value and visible attributes such as Domain, Path, SameSite, Secure, and expiry/session behavior, along with the Cart preference display if space permits.

The cookie is non-sensitive. Do not expose unrelated cookies in the image.

## 6. Query-Parameter Product Detail

**Filename:** <code>06-query-parameter-product-details.png</code>

1. Select a product through the Catalog UI.
2. Confirm the address follows <code>http://localhost:5000/catalog?productId=&lt;known-id&gt;</code>.
3. Refresh the page and confirm the same detail remains.
4. Capture the full address bar and the matching product-detail UI.

The screenshot should make bookmarkability visible without including private query data.

## 7. Custom-Event Communication

**Filename:** <code>07-custom-event-notification.png</code>

1. Open <code>http://localhost:5000/</code>. This route mounts both Catalog and compact Cart.
2. Add a product from Catalog.
3. Capture the Cart's transient <code>cart:item-added</code> notification before it disappears.
4. Include the Catalog action context and compact Cart in the same frame where possible.
5. Confirm the product quantity increased by exactly one. The event is notification-only and must not double-add.

For additional evidence, DevTools may log or pause on the <code>cart:item-added</code> event, but do not alter application behavior merely for the screenshot. On <code>/catalog</code>, Cart is unmounted and no notification is expected; that is the documented active-listener limitation.

## 8. Shared Redux State

**Filename:** <code>08-redux-devtools-shared-cart.png</code>

1. Keep the composed <code>/</code> route open.
2. Open Redux DevTools.
3. Add a product from Catalog.
4. Select the resulting cart action.
5. Expand state so <code>cart.items</code>, <code>cart.totalItems</code>, and <code>cart.totalPrice</code> are visible.
6. Keep the Host badge and compact Cart visible behind/beside DevTools if the browser layout permits.
7. Capture the action/state plus the synchronized UI.

This is the visual proof that Catalog dispatch, Cart selection, and the Host badge use one store. A separately opened Catalog or Cart standalone store is not valid evidence for the shared runtime requirement.

## Optional Short Demo

A short GIF or video may supplement the images. A useful sequence is:

1. Load the Host.
2. Open a query-driven product.
3. Add it on the composed route and show the event notification.
4. Open Cart, change quantity, remove an item, and show totals.
5. Refresh and show the persisted cart.
6. Open the browser storage views and Redux DevTools.
7. Briefly stop a remote to show the Host error fallback, then restore it.

Keep the demo concise and avoid recording unrelated windows or credentials.

## Evidence Checklist

- [ ] <code>01-catalog-product-listing.png</code>
- [ ] <code>02-cart-quantity-total.png</code>
- [ ] <code>03-local-storage-cart.png</code>
- [ ] <code>04-session-storage-recently-viewed.png</code>
- [ ] <code>05-cookie-currency.png</code>
- [ ] <code>06-query-parameter-product-details.png</code>
- [ ] <code>07-custom-event-notification.png</code>
- [ ] <code>08-redux-devtools-shared-cart.png</code>
- [ ] Root README Pending statuses replaced only after the corresponding files exist
- [ ] No screenshot exposes secrets or unrelated browser/account data

When images are present, verify every README link on GitHub and retain the original PNG files at readable resolution.
