[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/feVVTjSF)
# Assignment 2 — MFE Assignment: Cross-MFE E-Commerce App with Shared Cart State

## 📌 Overview

In this assignment, you will build a small **E-Commerce application using Micro Frontends (MFEs)** and **Module Federation**.

The application will consist of multiple independently developed and deployed Micro Frontends that communicate and share data with each other.

The primary goal of this assignment is to understand and demonstrate the **Data-Sharing Toolbox** introduced in Lecture 2:

- `localStorage`
- `sessionStorage`
- Cookies
- Query Parameters
- Custom Events
- Shared Redux State through Module Federation

You will implement a **Product Catalog MFE** and a **Shopping Cart MFE**, and demonstrate how data can be passed between these independent applications using different state/data-sharing mechanisms.

> **Important:** The goal is not only to make the application work. You must also explain **when, why, and where each data-sharing mechanism should be used**, including its advantages and limitations.

---

# 🎯 Learning Objectives

By completing this assignment, you should be able to:

1. Understand the architecture of Micro Frontends.
2. Configure and use **Webpack Module Federation**.
3. Build independently deployable MFEs.
4. Share UI/components between MFEs.
5. Share application state between MFEs.
6. Understand different browser-based data-sharing mechanisms.
7. Implement communication between independent MFEs.
8. Compare different approaches to cross-MFE communication.
9. Identify the appropriate data-sharing mechanism for different use cases.
10. Understand the trade-offs between loosely coupled and tightly coupled MFEs.

---

# 🏗️ Application Requirements

You will build an E-Commerce application consisting of at least the following applications:

```text
                    ┌─────────────────────┐
                    │       Host App      │
                    │   E-Commerce Shell  │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
       ┌────────▼────────┐          ┌────────▼────────┐
       │  Catalog MFE    │          │    Cart MFE     │
       │                 │          │                 │
       │ Product Listing │          │ Cart Items      │
       │ Product Details │          │ Quantity        │
       │ Add to Cart     │          │ Total Price     │
       └─────────────────┘          └─────────────────┘
```

### Required Applications

#### 1. Host / Shell Application

The Host application should:

- Load the Catalog MFE.
- Load the Cart MFE.
- Provide basic navigation.
- Display the overall application layout.
- Integrate the independent MFEs using Module Federation.

#### 2. Catalog MFE

The Catalog MFE should:

- Display a list of products.
- Display at least:
  - Product name
  - Price
  - Image
  - Description
- Allow users to add products to the cart.
- Allow users to view product details.
- Communicate the selected product to the Cart MFE.

#### 3. Cart MFE

The Cart MFE should:

- Display products added to the cart.
- Display quantity for each product.
- Allow users to increase/decrease quantity.
- Allow users to remove products.
- Display subtotal/total price.
- Display the total number of items.

---

# 🧰 Technology Requirements

You must use the following technologies:

- React
- JavaScript or TypeScript
- Module Federation
- Redux Toolkit
- React Router
- HTML5 Web APIs where applicable

You may use:

- Vite with Module Federation
- Webpack Module Federation
- CSS / Tailwind CSS / Material UI
- Any suitable icon library
- Any mock product API or local JSON data

> The recommended implementation is React + TypeScript + Redux Toolkit + Module Federation.

---

# 📦 Required Project Structure

Your repository should follow a structure similar to:

```text
mfe-ecommerce/
│
├── host/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── catalog-mfe/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── cart-mfe/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── shared/
│   └── ...
│
└── README.md
```

You may choose a different structure if your architecture is clearly documented.

---

# 🔄 Part 1 — Module Federation Setup

Configure Module Federation so that the Host application can consume the Catalog and Cart MFEs independently.

For example:

```text
Host
 ├── Catalog MFE
 └── Cart MFE
```

The MFEs should be exposed remotely and consumed by the Host application.

### Requirements

- Catalog MFE must be independently runnable.
- Cart MFE must be independently runnable.
- Host must consume both MFEs.
- MFEs should not be directly copied into the Host application.
- Remote modules should be loaded using Module Federation.

---

# 🛒 Part 2 — Basic E-Commerce Functionality

Implement the following functionality.

## Product Catalog

The Catalog MFE should display a minimum of **8 products**.

Example:

```text
Product
-------------------------
Name: Wireless Headphones
Price: $99
Description: ...
[Add to Cart]
```

Users should be able to click:

```text
Add to Cart
```

and the selected product should become available to the Cart MFE.

---

## Shopping Cart

The Cart MFE should display:

```text
Shopping Cart

Wireless Headphones
$99
Quantity: 2

Laptop Stand
$49
Quantity: 1

--------------------
Total Items: 3
Total: $247
```

Users should be able to:

- Add items
- Remove items
- Increase quantity
- Decrease quantity
- Clear the cart
- View total items
- View total price

---

# 🧰 Part 3 — Data-Sharing Toolbox

This is the **core part of the assignment**.

You must demonstrate how data can be shared between independent MFEs using the following mechanisms.

---

# 1️⃣ localStorage

Use `localStorage` to persist cart-related information.

### Requirement

When a user adds an item to the cart:

```text
Catalog MFE
     ↓
localStorage
     ↓
Cart MFE
```

The cart should remain available even after refreshing the browser.

### Demonstrate

- Saving cart data.
- Reading cart data.
- Updating cart data.
- Removing cart data.
- Handling an empty cart.

### Example

```javascript
localStorage.setItem(
  "cart",
  JSON.stringify(cart)
);
```

### Explain

In your documentation, explain:

- Why localStorage is useful.
- What happens when the browser is refreshed.
- Whether localStorage is shared between MFEs.
- Security considerations.
- Limitations of localStorage.

---

# 2️⃣ sessionStorage

Use `sessionStorage` for temporary information.

### Requirement

Use `sessionStorage` to store something such as:

```text
currentProduct
recentlyViewedProduct
checkoutStep
```

For example:

```javascript
sessionStorage.setItem(
  "recentProduct",
  JSON.stringify(product)
);
```

### Demonstrate

The stored information should be available while the browser tab/session remains active.

### Explain

Document:

- Difference between `localStorage` and `sessionStorage`.
- When sessionStorage is more appropriate.
- What happens when the browser/tab is closed.
- Whether sessionStorage should be used for persistent cart state.

---

# 3️⃣ Cookies

Use cookies to share a small piece of information between the applications.

### Requirement

Store information such as:

```text
currency=USD
```

or:

```text
cartSessionId=12345
```

Example:

```javascript
document.cookie = "currency=USD; path=/";
```

### Demonstrate

The application should read the cookie from another MFE.

### Explain

Document:

- What cookies are.
- When cookies are appropriate.
- Cookie size limitations.
- `HttpOnly`
- `Secure`
- `SameSite`
- Why sensitive information should not be stored in normal client-readable cookies.

---

# 4️⃣ Query Parameters

Use URL query parameters to share information between MFEs.

### Requirement

Implement a flow such as:

```text
/catalog/product/10
```

or:

```text
/catalog?productId=10
```

For example:

```text
/cart?coupon=SAVE10
```

The Cart MFE should be able to read the parameter.

### Example

```javascript
const params = new URLSearchParams(window.location.search);

const productId = params.get("productId");
```

### Demonstrate

Use query parameters for information that should be:

- Shareable
- Bookmarkable
- Visible in the URL
- Preserved when navigating between applications

### Explain

Discuss:

- Advantages of query parameters.
- URL visibility.
- Security implications.
- Appropriate use cases.

---

# 5️⃣ Custom Events

Use browser Custom Events to communicate between the Catalog and Cart MFEs.

### Requirement

When a user clicks:

```text
Add to Cart
```

the Catalog MFE should dispatch a custom event.

Example:

```javascript
window.dispatchEvent(
  new CustomEvent("cart:item-added", {
    detail: product
  })
);
```

The Cart MFE should listen for this event:

```javascript
window.addEventListener(
  "cart:item-added",
  handleAddToCart
);
```

### Demonstrate

The following flow should work:

```text
Catalog MFE
     │
     │ CustomEvent
     ▼
Browser Window
     │
     ▼
Cart MFE
```

### Explain

Document:

- Why Custom Events are useful.
- Advantages of loose coupling.
- Limitations of Custom Events.
- How event naming should be handled.
- What happens if the receiving MFE is not mounted.

---

# 6️⃣ Shared Redux State via Module Federation

This is the **most important implementation requirement**.

You must demonstrate sharing Redux state between the Catalog and Cart MFEs through Module Federation.

The goal is to create a shared cart state such as:

```javascript
{
  cart: {
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99,
        quantity: 2
      }
    ],
    totalItems: 2,
    totalPrice: 198
  }
}
```

---

## Shared Redux Architecture

The expected architecture is:

```text
                 ┌─────────────────────┐
                 │   Shared Redux Store │
                 │                     │
                 │   cartSlice         │
                 └──────────┬──────────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
          ┌──────▼──────┐       ┌──────▼──────┐
          │ Catalog MFE │       │   Cart MFE   │
          │             │       │              │
          │ dispatch()  │       │ useSelector()│
          └─────────────┘       └──────────────┘
```

### Requirements

The shared Redux state should contain at least:

```text
cart.items
cart.totalItems
cart.totalPrice
```

The Catalog MFE should be able to:

```text
dispatch(addToCart(product))
```

The Cart MFE should be able to:

```text
useSelector(state => state.cart)
```

The state must be shared rather than maintaining two unrelated Redux stores.

---

# 🔗 Module Federation Shared Dependencies

Ensure dependencies such as React and Redux are configured correctly to avoid multiple instances where appropriate.

For example:

```text
react
react-dom
react-redux
@reduxjs/toolkit
```

should be configured appropriately as shared dependencies.

You must document your Module Federation configuration and explain why these dependencies are shared.

---

# 🧪 Part 4 — Demonstration Requirements

Your application must demonstrate all six mechanisms.

| Mechanism | Required Demonstration |
|---|---|
| localStorage | Persistent cart/session data |
| sessionStorage | Temporary browsing/session data |
| Cookies | Shared preference/session information |
| Query Parameters | Product/navigation information |
| Custom Events | Add-to-cart communication |
| Shared Redux | Centralized cross-MFE cart state |

---

# 🔍 Part 5 — Comparison & Justification

Create a section in your README called:

```text
## Data-Sharing Mechanism Comparison
```

Compare all six mechanisms.

Your comparison should include:

| Mechanism | Persistence | Communication | Coupling | Best Use Case | Limitations |
|---|---|---|---|---|---|
| localStorage | Long-term | Indirect | Low | Persistent client data | Browser-only |
| sessionStorage | Session | Indirect | Low | Temporary session data | Limited lifetime |
| Cookies | Configurable | Browser/Server | Low | Small session/preferences | Size/security constraints |
| Query Params | URL-based | Navigation | Low | Shareable navigation state | Visible in URL |
| Custom Events | Runtime | Direct events | Low | MFE communication | Requires active listeners |
| Shared Redux | Runtime | Direct state | Higher | Complex shared application state | Stronger coupling |

> The table above is a starting point. You must expand the explanation in your own words based on your implementation.

---

# 💡 Part 6 — Architecture Justification

In your README, answer the following questions.

### Question 1

Why would you choose **Custom Events** instead of Redux for communication between two independent MFEs?

---

### Question 2

When would `localStorage` be a better choice than Redux?

---

### Question 3

When should `sessionStorage` be used instead of `localStorage`?

---

### Question 4

Why should sensitive information generally not be stored in query parameters?

---

### Question 5

What are the advantages and disadvantages of using a shared Redux store across MFEs?

---

### Question 6

Does sharing Redux state increase coupling between MFEs? Explain.

---

### Question 7

If the Cart MFE is deployed independently from the Catalog MFE, which communication mechanisms would make the MFEs more independent?

Explain your answer.

---

### Question 8

If the user refreshes the browser, which data-sharing mechanisms will retain their data?

Explain the behavior of:

- localStorage
- sessionStorage
- cookies
- query parameters
- Custom Events
- Redux

---

# 🧪 Part 7 — Testing

You should include tests for important functionality.

At minimum, test:

### Catalog MFE

- Products render correctly.
- Add to Cart works.
- Custom event is dispatched.
- Redux action is dispatched.

### Cart MFE

- Cart items render.
- Quantity can be increased.
- Quantity can be decreased.
- Items can be removed.
- Total price is calculated correctly.
- Cart can be cleared.

### Data Sharing

Test at least:

- localStorage persistence.
- sessionStorage behavior.
- Query parameter parsing.
- Custom event handling.
- Shared Redux state.

Recommended tools:

```text
Jest
React Testing Library
```

---

# 📸 Part 8 — Screenshots / Demo

Include screenshots or a short GIF/video demonstrating:

### 1. Catalog

Show:

```text
Product Listing
     ↓
Add to Cart
```

### 2. Cart

Show:

```text
Cart
     ↓
Quantity
     ↓
Total
```

### 3. localStorage

Show the cart data in browser DevTools.

### 4. sessionStorage

Show the session data in browser DevTools.

### 5. Cookies

Show the cookie in browser DevTools.

### 6. Query Parameters

Show an example URL.

### 7. Custom Events

Show the communication flow in your implementation.

### 8. Shared Redux

Show Redux DevTools demonstrating the shared cart state.

---

# 📁 Expected Deliverables

Your GitHub repository must contain:

```text
├── host/
├── catalog-mfe/
├── cart-mfe/
├── README.md
├── package.json
└── ...
```

Your submission must include:

- Working Host application.
- Working Catalog MFE.
- Working Cart MFE.
- Module Federation configuration.
- Shared Redux implementation.
- localStorage implementation.
- sessionStorage implementation.
- Cookie implementation.
- Query parameter implementation.
- Custom Events implementation.
- Unit/component tests.
- Architecture documentation.
- Data-sharing comparison.
- Screenshots or demo video.

---

# 📖 README Documentation Requirements

Your README must contain the following sections:

```text
# Project Title

## Overview

## Architecture

## Technologies Used

## Project Structure

## Running the Application

## Module Federation Configuration

## Catalog MFE

## Cart MFE

## Data-Sharing Toolbox

### localStorage

### sessionStorage

### Cookies

### Query Parameters

### Custom Events

### Shared Redux State

## Data-Sharing Mechanism Comparison

## Architecture Decisions

## Testing

## Screenshots / Demo

## Challenges & Solutions

## Conclusion
```

---

# ▶️ Running the Application

Your project should provide clear instructions for running all applications.

For example:

```bash
# Install dependencies
npm install

# Start Host
npm run dev:host

# Start Catalog MFE
npm run dev:catalog

# Start Cart MFE
npm run dev:cart
```

You may use different commands depending on your implementation.

Clearly document the actual commands used by your project.

---

# 🌐 Expected Application Flow

The following is an example of the expected user journey:

```text
1. User opens the E-Commerce application
                 ↓
2. Host loads Catalog MFE
                 ↓
3. User browses products
                 ↓
4. User clicks "Add to Cart"
                 ↓
5. Catalog communicates with Cart
                 ↓
6. Cart state is updated
                 ↓
7. Cart badge updates
                 ↓
8. User opens Cart
                 ↓
9. Cart MFE displays selected products
                 ↓
10. User changes quantity
                 ↓
11. Total price is recalculated
```

---

# ⭐ Bonus Requirements

The following are optional but can earn bonus marks.

## Bonus 1 — Wishlist MFE

Create a third MFE:

```text
Wishlist MFE
```

Allow users to add/remove wishlist items.

---

## Bonus 2 — Authentication MFE

Create an authentication MFE that shares:

```text
user
isAuthenticated
token/session information
```

with other MFEs.

---

## Bonus 3 — Cross-Tab Synchronization

Use the browser `storage` event to synchronize cart changes across browser tabs.

Example:

```javascript
window.addEventListener("storage", handleStorageChange);
```

---

## Bonus 4 — Offline Support

Allow users to continue viewing their cart when temporarily offline.

---

## Bonus 5 — Independent Deployment

Deploy:

```text
Host MFE
Catalog MFE
Cart MFE
```

independently and configure the Host to consume the remotely deployed MFEs.

---

# 📊 Evaluation Criteria

| Category | Marks |
|---|---:|
| Micro Frontend Architecture | 10 |
| Module Federation Configuration | 15 |
| Catalog MFE | 10 |
| Cart MFE | 10 |
| localStorage Implementation | 5 |
| sessionStorage Implementation | 5 |
| Cookies Implementation | 5 |
| Query Parameters Implementation | 5 |
| Custom Events Implementation | 10 |
| Shared Redux State | 15 |
| Testing | 5 |
| Documentation & Justification | 5 |
| **Total** | **100** |

---

# 🚨 Important Rules

1. The Catalog and Cart must be implemented as **independent MFEs**.
2. Do not simply place both applications inside one React application and call them MFEs.
3. Module Federation must be used for MFE integration.
4. Shared Redux state must demonstrate actual state sharing between MFEs.
5. Each data-sharing mechanism must have a meaningful use case.
6. Do not use one mechanism for all requirements.
7. Clearly explain the trade-offs of every mechanism.
8. Code should be clean, modular, and maintainable.
9. Avoid hardcoding calculated values such as cart totals.
10. Handle loading and error states appropriately.

---

# 📝 Submission Checklist

Before submitting your assignment, verify:

- [ ] Host application works.
- [ ] Catalog MFE works independently.
- [ ] Cart MFE works independently.
- [ ] Module Federation is configured.
- [ ] Products can be added to the cart.
- [ ] Cart quantity can be changed.
- [ ] Products can be removed.
- [ ] Cart total is calculated correctly.
- [ ] localStorage is implemented.
- [ ] sessionStorage is implemented.
- [ ] Cookies are implemented.
- [ ] Query parameters are implemented.
- [ ] Custom Events are implemented.
- [ ] Shared Redux state is implemented.
- [ ] Redux state is actually shared between MFEs.
- [ ] Tests are included.
- [ ] README is complete.
- [ ] Architecture is documented.
- [ ] Data-sharing mechanisms are compared.
- [ ] Architecture decisions are justified.
- [ ] Screenshots/demo are included.
- [ ] Repository runs using documented commands.

---

# 🎓 Final Goal

The purpose of this assignment is **not simply to build a shopping cart**.

The main objective is to understand how independently developed Micro Frontends can **communicate, share state, and remain as decoupled as possible**.

By the end of the assignment, you should be able to answer:

> **"If I have two independent Micro Frontends, how should they share data, and which mechanism should I choose for a particular use case?"**

You should be able to justify your choice between:

```text
localStorage
      ↓
sessionStorage
      ↓
Cookies
      ↓
Query Parameters
      ↓
Custom Events
      ↓
Shared Redux State
```

based on **persistence, coupling, security, scalability, communication requirements, and application architecture**.

---

## 📅 Deadline

Please submit your GitHub repo link by: 25 - August - 2026

---

## 💡 Tips
- Start all remote apps before running the shell.
- Keep each remote app small and focused.
- Test what happens when one remote app is stopped.
- Use clear component names and folder structure.
- Read the Module Federation and Vite plugin documentation carefully. 

---

## 🚀 Good Luck!

Build it, experiment with the different data-sharing approaches, and most importantly — **understand why you chose each approach, not just how to implement it.**

---

Helpful links:

- https://vitejs.dev/
- https://react.dev/
- https://reactrouter.com/
- https://github.com/originjs/vite-plugin-federation

## Happy Building! ⚡

---

# Implementation Documentation

> **Status and scope:** The text above is the original assignment brief and is intentionally preserved. This section documents the implementation that follows it. Screenshot evidence is not fabricated; the required captures are listed as pending until they are created manually.

## Project Title

Cross-MFE Commerce — Federated Catalog and Cart with Shared Redux State

## Overview

This project implements the required e-commerce experience as three independently runnable React applications in one npm workspace:

- **Host / Shell** composes the product and cart experiences, owns the top-level router, creates the shared runtime Redux store, and renders the Redux <code>Provider</code>.
- **Catalog MFE** owns the product list, product details, recently viewed product behavior, and add-to-cart interaction.
- **Cart MFE** owns cart presentation, quantity controls, item removal, clearing, totals, and the notification produced by the Catalog custom event.
- **Shared package** owns the cart state contract, reducers/actions, selectors, persistence helpers, browser-data helpers, event constants, and shared types.

The live cart uses one Redux store when the MFEs are composed by the Host. The other five mechanisms have separate, meaningful responsibilities: <code>localStorage</code> persists the cart, <code>sessionStorage</code> remembers a recently viewed product for the current tab, a cookie carries the currency preference, query parameters identify a shareable product detail, and a browser <code>CustomEvent</code> announces that an item was added.

## Architecture

### Runtime composition

~~~mermaid
flowchart TB
    Browser[Browser at localhost:5000] --> Host[Host / Shell]
    Host --> Router[Host-owned React Router]
    Host --> Provider[Host-owned React Redux Provider]
    Provider --> Store[One shared Redux store]
    Router --> Home["/ — composed Catalog + compact Cart"]
    Router --> CatalogRoute["/catalog — Catalog remote"]
    Router --> CartRoute["/cart — Cart remote"]
    Home --> CatalogRemote[Catalog MFE from localhost:5001]
    Home --> CartRemote[Cart MFE from localhost:5002]
    CatalogRoute --> CatalogRemote
    CartRoute --> CartRemote
    CatalogRemote -->|dispatch addToCart| Store
    CartRemote -->|selectors and cart actions| Store
    Host -->|cart badge selector| Store
    Store -->|persist cart snapshot| LocalStorage["localStorage: mfe:cart"]
    CatalogRemote -->|cart:item-added notification| WindowEvent[Browser window]
    WindowEvent -->|only while listener is mounted| CartRemote
~~~

The <code>/</code> route intentionally mounts both remotes so the shared-state update and the custom-event notification can be observed together. The <code>/catalog</code> route mounts only Catalog, and <code>/cart</code> mounts only Cart. Because browser events are ephemeral, <code>cart:item-added</code> has no receiver when Cart is not mounted; Redux still records the add and the Host badge still updates. This is a deliberate demonstration of the difference between durable/reactive state and a transient event.

### Application responsibilities

| Workspace | Default development URL | Responsibility | Federated role |
|---|---|---|---|
| <code>host</code> | <code>http://localhost:5000</code> | Layout, navigation, routes, shared Provider, store instance, badge, loading and remote error boundaries | Consumes both remotes |
| <code>catalog-mfe</code> | <code>http://localhost:5001</code> | Product list/detail, add action, recent-product session data, currency preference, event publication | Exposes Catalog application |
| <code>cart-mfe</code> | <code>http://localhost:5002</code> | Cart rendering and mutations, totals, empty state, currency read, event notification | Exposes Cart application |
| <code>shared</code> | Not an application | Redux contract, cart domain logic, browser-data utilities, event and type contracts | Workspace dependency used by all applications |

### Independence and composition

Catalog and Cart each have their own HTML entry point, Vite configuration, build, development server, and standalone bootstrap. Their exposed federated application components do **not** create a Redux Provider or a BrowserRouter. When composed, they consume the Host's contexts.

For standalone development only, each remote's <code>main</code> entry creates a local store and the minimum router/provider wrappers it needs. Those local stores are intentionally isolated because a standalone page is a different JavaScript runtime. This does not turn the composed application into synchronized stores: the Host runtime always contains one store instance.

## Technologies Used

| Technology | Purpose |
|---|---|
| React and React DOM | Component UI and rendering |
| TypeScript | Shared product/cart contracts and safer application code |
| Vite | Development servers and production builds |
| <code>@module-federation/vite</code> | Runtime remote exposure and consumption |
| Redux Toolkit | Cart slice, actions, selectors, and store configuration |
| React Redux | One Host Provider plus hooks used by the Host and both remotes |
| React Router | Host navigation and bookmarkable product selection |
| Vitest, React Testing Library, and jsdom | Unit, component, integration, and browser-API tests |
| HTML5 Web APIs | Storage, cookies, query parsing, and custom events |

Dependency versions are pinned in the workspace manifests and lockfile. The manifests are the source of truth; all applications deliberately use compatible React, React Redux, Redux Toolkit, Router, Vite, and Federation versions.

The implementation is aligned on these key manifest versions:

| Package / runtime | Version |
|---|---|
| Node.js | <code>^20.19.0 or &gt;=22.12.0</code> |
| React / React DOM | <code>19.2.8</code> |
| Redux Toolkit | <code>2.12.0</code> |
| React Redux | <code>9.3.0</code> |
| React Router / React Router DOM | <code>7.18.2</code> |
| Vite | <code>8.2.0</code> |
| <code>@module-federation/vite</code> | <code>1.20.6</code> |
| TypeScript | <code>5.9.3</code> |
| Vitest | <code>4.1.10</code> |
| React Testing Library | <code>16.3.2</code> |

## Project Structure

~~~text
.
├── host/
│   ├── src/                 # Shell layout, router, store creation, remotes
│   ├── package.json
│   └── vite.config.ts
├── catalog-mfe/
│   ├── src/                 # Catalog feature and standalone bootstrap
│   ├── package.json
│   └── vite.config.ts
├── cart-mfe/
│   ├── src/                 # Cart feature and standalone bootstrap
│   ├── package.json
│   └── vite.config.ts
├── shared/
│   ├── src/                 # Redux, selectors, persistence, events, types
│   └── package.json
├── docs/
│   └── screenshots/
│       └── README.md        # Manual evidence capture guide
├── scripts/                 # Multi-application development/preview runner
├── package.json             # npm workspaces and root commands
├── package-lock.json
└── README.md                # Official brief plus this implementation record
~~~

Generated <code>dist</code> output, including generated <code>remoteEntry.js</code> files, is build output and must not be edited manually.

## Running the Application

### Prerequisites

- A Node.js version compatible with the version declared by the repository.
- npm.
- Ports <code>5000</code>, <code>5001</code>, and <code>5002</code> available.

Install all workspace dependencies once from the repository root:

~~~bash
npm install
# Equivalent repository alias:
npm run setup
~~~

Start the full development system:

~~~bash
npm run dev
~~~

Then open <code>http://localhost:5000</code>. The root runner starts and supervises:

| Application | URL | Federated asset |
|---|---|---|
| Host | <code>http://localhost:5000</code> | Consumes the remote entries |
| Catalog | <code>http://localhost:5001</code> | <code>http://localhost:5001/assets/remoteEntry.js</code> |
| Cart | <code>http://localhost:5002</code> | <code>http://localhost:5002/assets/remoteEntry.js</code> |

To work on one application independently:

~~~bash
npm run dev:catalog
npm run dev:cart
npm run dev:host
~~~

Catalog and Cart are usable at their own URLs with their standalone-only providers. The Host requires both remote servers for the complete composed experience.

### Build, test, and verification commands

| Command | Purpose |
|---|---|
| <code>npm run setup</code> | Install all root and workspace dependencies |
| <code>npm run build</code> | Build shared, Catalog, Cart, and Host in dependency order |
| <code>npm run build:shared</code> | Build/type-check the shared package |
| <code>npm run build:catalog</code> | Build Catalog and generate its remote entry |
| <code>npm run build:cart</code> | Build Cart and generate its remote entry |
| <code>npm run build:host</code> | Build the consuming shell |
| <code>npm run test</code> | Run the complete test suite once |
| <code>npm run test:watch</code> | Run tests in watch mode |
| <code>npm run test:coverage</code> | Run tests and create the configured coverage report |
| <code>npm run lint</code> | Run the configured static lint checks |
| <code>npm run typecheck</code> | Type-check all workspaces without emitting application output |
| <code>npm run verify</code> | Run the repository's combined quality gate |
| <code>npm run preview</code> | Preview the production builds together |
| <code>npm run preview:host</code> | Preview only the Host build |
| <code>npm run preview:catalog</code> | Preview only the Catalog build |
| <code>npm run preview:cart</code> | Preview only the Cart build |

Run <code>npm run verify</code> before submission. A command should only be described as passing after its real output has been checked; verification results belong in the development report rather than being invented in this document.

## Module Federation Configuration

Catalog and Cart are built and served as separate Vite applications. Each remote exposes its application component, and the Host resolves those modules from the remote entry URLs:

~~~text
Host
├── catalog remote -> http://localhost:5001/assets/remoteEntry.js
└── cart remote    -> http://localhost:5002/assets/remoteEntry.js
~~~

The logical exposed modules are the Catalog application and Cart application. Host integrations use lazy imports so normal loading UI is visible while a remote is being resolved. Each remote is isolated behind an error boundary so one unavailable remote produces an actionable fallback instead of crashing the whole shell.

The default entries can be overridden for another environment with <code>VITE_CATALOG_REMOTE_URL</code> and <code>VITE_CART_REMOTE_URL</code>. This keeps the Host build independent of a single deployment hostname.

The Federation share configuration treats the following packages as shared runtime dependencies:

- <code>react</code>
- <code>react-dom</code>
- <code>react-redux</code>
- <code>@reduxjs/toolkit</code>
- <code>react-router</code>
- <code>react-router-dom</code>
- <code>@mfe/shared</code>

React and React DOM must resolve compatibly to avoid invalid-hook-call failures. React Redux must resolve to the same context implementation so remote hooks can read the Host Provider. Redux Toolkit is aligned so actions, middleware, and store behavior use one compatible contract. React Router packages share the Host's navigation context; exposed applications do not create nested BrowserRouters. The local <code>@mfe/shared</code> contract is also a singleton so the Host and remotes resolve the same cart actions, selectors, storage adapters, event contracts, and types at runtime.

Sharing dependencies is necessary but not sufficient to share state. The decisive step is that the Host creates exactly one store and renders one Provider above both remote components and the Host cart badge. Neither exposed remote application creates a production Provider.

### Development and deployment considerations

- Start the two remote development servers before expecting the Host to resolve them.
- Keep remote URLs configurable for independently deployed environments rather than baking a production hostname into source code.
- Deploy a remote entry and all chunks from the same build so chunk URLs remain consistent.
- Configure CORS and caching for the deployment origins. A remote entry usually needs more conservative caching than content-hashed chunks.
- A successful build must generate Catalog and Cart <code>assets/remoteEntry.js</code>; generated files are verified, never hand-edited.

## Catalog MFE

Catalog owns a local product data set containing at least eight products. Every product provides an identifier, name, price, image, and description. It supports:

- Product-card rendering.
- A product-detail state selected through <code>?productId=&lt;id&gt;</code>.
- A useful unknown-product fallback.
- Add to Cart through the shared Redux action.
- Recently viewed product persistence in session storage.
- A small currency preference written to a cookie.
- A namespaced custom-event announcement after the Redux add.

The add interaction has one authoritative mutation:

~~~text
User clicks Add to Cart
        |
        +-- dispatch(addToCart(product)) -> shared Redux store -> localStorage snapshot
        |
        +-- dispatch cart:item-added     -> transient Cart notification only
~~~

The second branch never dispatches another cart reducer action, preventing one click from incrementing quantity twice.

## Cart MFE

Cart reads <code>state.cart</code> through shared selectors and renders:

- Every selected item and its quantity.
- Increment and decrement controls.
- Removal for an individual line.
- Clear Cart.
- Total item count.
- Total price derived from price multiplied by quantity.
- A clear empty-cart state.
- Currency read from the shared preference cookie.
- A transient message when <code>cart:item-added</code> is received while Cart is mounted.

Decrementing the final unit removes the line rather than retaining a zero quantity. Reducers derive totals from current items; totals are not hardcoded. The custom-event listener is registered on mount and removed with the same function reference on unmount.

## Shared State Architecture

### Store ownership

~~~mermaid
sequenceDiagram
    participant Host
    participant Provider
    participant Catalog
    participant Store
    participant Cart
    participant Storage as localStorage

    Host->>Store: create one runtime store, hydrated safely
    Host->>Provider: provide that store
    Provider-->>Catalog: same React Redux context
    Provider-->>Cart: same React Redux context
    Catalog->>Store: dispatch addToCart(product)
    Store-->>Cart: selector update
    Store-->>Host: badge selector update
    Store->>Storage: persist mfe:cart snapshot
~~~

The minimum shared state shape is:

~~~ts
{
  cart: {
    items: [
      {
        id: "product-id",
        name: "Product name",
        price: 99,
        quantity: 1
      }
    ],
    totalItems: 1,
    totalPrice: 99
  }
}
~~~

The shared cart contract provides add, increment, decrement, remove, and clear actions plus selectors for items, item count, and total price. Product price and quantity are the input to total calculation. Invalid persisted input falls back to the empty initial state.

### Composed versus standalone stores

| Runtime | Provider/store behavior |
|---|---|
| Host composition | Host creates one store; Host badge, Catalog, and Cart use it |
| Standalone Catalog | Catalog bootstrap creates a development store so the remote is independently usable |
| Standalone Cart | Cart bootstrap creates a development store so cart behavior can be developed independently |

Standalone stores are not synchronized and are not presented as shared. State is genuinely shared only among components mounted in the same Host runtime.

## Data-Sharing Toolbox

Each mechanism solves a different problem. Redux is the live cart authority; the other mechanisms are not competing cart reducers.

### localStorage

**What:** The cart snapshot is stored under <code>mfe:cart</code>.

**Why:** A page refresh destroys in-memory Redux state. Local storage survives refresh and normal browser restarts, so it is suitable for a small, non-sensitive guest cart.

**Where and lifecycle:**

1. Host store creation reads and parses <code>mfe:cart</code>.
2. Valid data becomes the cart preloaded state; missing or malformed data becomes an empty cart.
3. Store changes update the stored snapshot.
4. Clear Cart removes the persisted cart value as well as resetting Redux.
5. The next refresh repeats safe hydration.

~~~ts
const CART_STORAGE_KEY = "mfe:cart";
localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
~~~

**Refresh and sharing behavior:** The value remains after refresh until application code, browser settings, or the user clears it. A federated remote executes in the Host document and therefore sees the Host origin's storage. Standalone applications on ports 5001 and 5002 are different origins and do not automatically share the Host's port-5000 storage.

**Limitations and security:** Local storage is synchronous, string-only, origin-scoped, quota-limited, non-reactive by itself, and readable by any same-origin JavaScript. An XSS payload could read it, so authentication tokens, payment data, or other secrets do not belong here. Persisted data must be parsed defensively and versioned/migrated if its schema evolves.

### sessionStorage

**What:** A bounded recently viewed product list is stored under <code>mfe:recently-viewed</code>.

**Why:** Recently viewed context is useful during a browsing session but does not need to follow the user indefinitely. Session storage avoids leaving stale browsing context in a later session.

**Where and lifecycle:** Catalog writes a small serialized list (up to five unique products, newest first) when details are viewed and reads it while the same tab remains open. It generally survives refresh in that tab and is discarded when that tab/session ends.

~~~ts
const RECENTLY_VIEWED_STORAGE_KEY = "mfe:recently-viewed";
sessionStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(recentProducts));
~~~

**Difference from local storage:** Both APIs are synchronous, string-only, and same-origin, but local storage has no tab-session expiry while session storage is scoped to a top-level browsing context. A composed remote sees the Host page's session storage. Different standalone origins/ports do not form one shared bucket.

**Limitations:** It is not suitable for the required persistent cart because closing the tab/session can remove it. It has the same client-readable/XSS concerns as local storage and does not notify React automatically.

### Cookies

**What:** A small non-sensitive currency preference uses the cookie name <code>mfe_currency</code>.

**Why:** Cookies are appropriate for small preferences that may need browser/server exchange and configurable lifetime/path policies. This assignment uses one MFE to write the preference and another to read it.

~~~ts
document.cookie = "mfe_currency=USD; Max-Age=2592000; Path=/; SameSite=Lax";
~~~

**Where and lifecycle:** Catalog writes the preference with a 30-day <code>Max-Age</code>; Cart parses <code>document.cookie</code> and uses the value for display. Cookies generally follow <code>Max-Age</code> or <code>Expires</code>; without either they are session cookies. In the Host composition both remotes run against the Host document's cookies. Different standalone ports share hostname-based cookies only subject to cookie domain/path/security rules, which differ from Web Storage's origin model.

**Security attributes:**

- <code>HttpOnly</code> prevents JavaScript access and can only be set by a server, so it cannot be used for this client-read demonstration.
- <code>Secure</code> restricts transmission to HTTPS, apart from browser-specific localhost handling.
- <code>SameSite</code> controls cross-site sending; <code>Lax</code> is an appropriate baseline for this preference.
- <code>Path</code> and <code>Domain</code> control request scope.

**Limitations:** Cookies are small (commonly about 4 KB each), are sent with matching HTTP requests, need careful encoding/parsing, and client-readable cookies are exposed to XSS. Sensitive information must not be stored in this normal JavaScript-readable preference cookie.

### Query Parameters

**What:** Product detail selection uses <code>/catalog?productId=&lt;id&gt;</code>. The Host keeps the query string as navigation state.

**Why:** The selected product should be visible, bookmarkable, shareable, refresh-safe, and compatible with browser back/forward navigation.

~~~ts
const productId = new URLSearchParams(window.location.search).get("productId");
~~~

**Where and lifecycle:** Catalog validates the parameter against its product data and renders either the product, the list, or an unknown-product fallback. The value lasts as long as it remains in the URL and travels with copied/bookmarked links.

**Limitations and security:** Query values are strings and user-controlled, so they must be validated. URLs appear in the address bar, history, screenshots, bookmarks, analytics, server/proxy logs, and sometimes referrer data. Secrets, tokens, personal information, and large payloads do not belong in query parameters.

### Custom Events

**What:** Catalog publishes the namespaced browser event <code>cart:item-added</code> after it dispatches the real Redux add. Cart listens only to show a transient notification. An optional <code>currency:changed</code> event can make a mounted consumer react immediately to the cookie preference.

~~~ts
window.dispatchEvent(
  new CustomEvent("cart:item-added", {
    detail: {
      productId: product.id,
      productName: product.name,
      quantity: 1
    }
  })
);
~~~

~~~ts
const onItemAdded = (event: Event) => {
  const detail = (event as CustomEvent).detail;
  // Validate detail and show a notification; do not mutate the cart.
};

window.addEventListener("cart:item-added", onItemAdded);
window.removeEventListener("cart:item-added", onItemAdded);
~~~

**Why:** An event lets a publisher announce a fact without importing the receiver or knowing how it will render that fact. Namespaced event names and documented, versionable payloads reduce accidental collisions.

**Lifecycle:** Events are synchronous, runtime-only messages. They are not queued or replayed. On <code>/</code>, compact Cart is mounted and can display the Catalog notification. On Catalog-only <code>/catalog</code>, there is no Cart listener, so the announcement is lost; Redux state and the Host badge still update. Listener cleanup prevents leaks and duplicate notifications after remounting.

**Limitations:** There is no built-in persistence, schema enforcement, replay, state inspection, or automatic error isolation. Global event names can collide, payload contracts can drift, and debugging is harder than Redux DevTools. Most importantly, this listener must never add the item again or one click would double-add.

### Shared Redux State

**What:** Redux is the source of truth for live cart items, quantities, item count, and price total.

**Why:** Catalog, Cart, and the Host badge all need immediate, predictable, reactive views of the same state. Reducers centralize cart invariants, while selectors provide a stable consumption boundary.

**Where and lifecycle:** The Host creates and provides the store when the page starts. Catalog dispatches <code>addToCart(product)</code>. Cart selects <code>state.cart</code> and dispatches increment, decrement, remove, and clear actions. Host selects the total for its badge. Memory state lasts until the page runtime ends; the <code>mfe:cart</code> adapter supplies persistence and hydration.

**Limitations:** Shared Redux increases coupling to the Provider, state/action contract, and compatible dependency versions. It requires singleton-compatible React Redux context and coordinated schema evolution. It only shares state inside one JavaScript page/runtime; separately opened standalone MFEs cannot share the same in-memory store.

## Routing

The Host owns the main BrowserRouter:

| Route | Content and purpose |
|---|---|
| <code>/</code> | Composed Catalog plus compact Cart; best route for demonstrating Redux and Custom Events together |
| <code>/catalog</code> | Full Catalog list |
| <code>/catalog?productId=aurora-headphones</code> | Bookmarkable product detail selected by query parameter |
| <code>/cart</code> | Full Cart management experience |

Remote application components assume a router exists when federated. Only their standalone <code>main</code> entry points add local router wrappers, avoiding nested BrowserRouter errors in the Host. Unknown paths, missing product IDs, invalid product IDs, loading remotes, and unavailable remotes all receive explicit UI states.

## Data-Sharing Mechanism Comparison

| Mechanism | Persistence / lifetime | Communication model | Scope | Coupling / reactivity | Best use in this project | Security and principal limitations |
|---|---|---|---|---|---|---|
| <code>localStorage</code> | Survives refresh/restart until cleared | Indirect read/write | Origin | Low contract coupling; not React-reactive without an adapter | Persist and hydrate <code>mfe:cart</code> | Client-readable, XSS exposure, synchronous/string-only, quota and schema-staleness risk |
| <code>sessionStorage</code> | Same tab/session; normally survives refresh but not session end | Indirect read/write | Origin plus top-level tab | Low; not reactive | <code>mfe:recently-viewed</code> browsing context | Client-readable, tab-specific, synchronous/string-only, unsuitable for durable cart |
| Cookies | Session or configured expiry | Browser storage and automatic matching HTTP request headers | Domain/path/security policy | Low; not reactive by itself | Small <code>mfe_currency</code> preference read by another MFE | Roughly 4 KB, request overhead, parsing/policy complexity, XSS if readable; HttpOnly cannot be read by JS |
| Query parameters | As long as the URL is retained | Navigation/address contract | Any recipient of the URL | Low and explicit | Bookmarkable <code>productId</code> | Publicly visible; leaks through history/logs/referrers/screenshots; strings require validation |
| Custom Events | Current runtime call only; no replay | Direct publish/subscribe on <code>window</code> | Same browser window | Low module coupling; reactive only with an active listener | <code>cart:item-added</code> notification | Lost when listener is absent, global-name/payload drift, weak tooling, no persistence |
| Shared Redux | Page-runtime memory; local storage adds persistence | Direct actions and selector subscription | One Provider/store runtime | Highest shared contract coupling; strongly reactive | Authoritative cart plus Host badge | Requires compatible singleton context, schema coordination, and one Provider; does not span separate pages by itself |

No single row is the universal solution. The implementation combines them according to persistence, visibility, coupling, security, and reactivity needs rather than forcing all data through one mechanism.

## Architecture Decisions

### 1. Why choose Custom Events instead of Redux for two independent MFEs?

Choose an event for a one-off fact or notification when the publisher should not import the receiver's store contract. A Catalog can announce that something happened and allow zero or more listeners, which lowers direct package coupling and supports independent feature ownership. Redux is preferable when components need current, replayable, inspectable state and coordinated mutations. Events require active listeners, offer no history, and need an explicit event-name/payload/version contract.

### 2. When is localStorage a better choice than Redux?

Local storage is better for a small, non-sensitive value that must outlive a page runtime or browser restart and does not need automatic component reactivity. Redux is in-memory application state and excels at predictable live updates, but it does not persist by itself. This project therefore does not choose one exclusively: Redux is live cart state, and local storage is its persistence adapter.

### 3. When should sessionStorage be used instead of localStorage?

Use session storage when a value should survive refresh in the current tab but should not remain as long-lived user data, such as recently viewed context or an in-progress checkout step. Use local storage when a later browser session should recover the value. Session storage is intentionally not the persistent cart mechanism.

### 4. Why should sensitive information generally not be stored in query parameters?

URLs are routinely displayed, copied, bookmarked, placed in browser history, captured in screenshots, recorded by analytics and infrastructure logs, and sometimes sent as referrer information. Encoding is not encryption. Query parameters are appropriate for public identifiers and filters after validation, not credentials, tokens, personal data, or payment details.

### 5. What are the advantages and disadvantages of a shared Redux store across MFEs?

Advantages include one source of truth, immediate consistent updates, centralized invariants, reusable selectors/actions, deterministic tests, and Redux DevTools visibility. Disadvantages include coupling to a common state contract and Provider, compatible React Redux/runtime requirements, coordinated schema migration, more complex Federation setup, and the fact that memory state does not cross pages or survive refresh without another mechanism.

### 6. Does sharing Redux state increase coupling between MFEs?

Yes. Both remotes depend on the Provider being present and on stable action, state, selector, and package contracts. That coupling is accepted for the cohesive cart domain because consistency is more important than total isolation. It is reduced by keeping the shared API small, using selectors instead of reaching through arbitrary state, owning mutations in one slice, pinning compatible dependencies, and treating contract changes as versioned changes.

### 7. Which mechanisms keep independently deployed Catalog and Cart more independent?

Custom Events and query parameters preserve stronger deployment independence because they rely on browser-level contracts rather than a shared store instance. Storage and cookies can also decouple modules, but only when origin/domain policies allow both applications to address the same bucket and both agree on a data schema. Shared Redux is the most tightly coordinated option because both MFEs must run under one compatible Provider and state contract. Independent deployment does not automatically mean independent origin, and browser origin rules must be considered explicitly.

### 8. What survives a browser refresh?

- **localStorage:** survives refresh and browser restart until cleared, within its origin.
- **sessionStorage:** survives refresh in the same tab/session but normally ends when that tab/session ends.
- **Cookies:** survive according to their expiry policy; a session cookie and a persistent <code>Max-Age</code>/<code>Expires</code> cookie behave differently.
- **Query parameters:** remain after refresh while they remain in the URL and also survive copying/bookmarking.
- **Custom Events:** do not survive or replay; they exist only during dispatch in the current page runtime.
- **Redux:** plain Redux memory does not survive refresh. In this project, the new store is rehydrated from <code>mfe:cart</code>, so the cart appears retained because local storage restores it.

## Design Decisions and Trade-offs

1. **One Host-owned store:** This is the clearest proof that state is shared, not synchronized. The trade-off is a defined integration contract and compatible React Redux runtime.
2. **Standalone-only providers:** Independent remote development remains possible without putting competing Providers inside federated components.
3. **Redux mutates; events notify:** The same click demonstrates tight and loose communication without corrupting quantity through a double mutation.
4. **Browser mechanisms have separate jobs:** Persistence, tab context, preference, navigation, notifications, and live state are modeled independently so their strengths and weaknesses stay visible.
5. **Host-owned router:** One navigation history prevents nested-router failures while query-driven product details remain shareable.
6. **Derived totals:** Cart totals are recomputed from item price and quantity, eliminating stale hardcoded values.
7. **Defensive browser data:** Storage, cookies, query strings, and event payloads are external inputs and are parsed/validated before use.
8. **Remote boundaries:** Suspense and error boundaries make slow or unavailable remotes understandable without concealing the failure.

## Testing

The test suite uses Vitest, React Testing Library, user-event, and jsdom. It should trace each rubric behavior:

| Area | Required proof |
|---|---|
| Catalog | At least eight products render; product details follow <code>productId</code>; Add to Cart dispatches the Redux action; <code>cart:item-added</code> is dispatched |
| Cart | Items and quantities render; increment/decrement/remove/clear work; empty state appears; totals are derived correctly |
| Shared integration | Catalog, Cart, and badge mounted under the exact same store update together; one click yields quantity one rather than two |
| localStorage | Valid hydration, state updates, clear/removal, missing key, and malformed JSON fallback |
| sessionStorage | Recently viewed write/read and session-scoped utility behavior |
| Cookies | Currency write/read parsing and safe fallback |
| Query parameters | Valid, missing, and unknown <code>productId</code> behavior |
| Custom Events | Dispatch, active-listener notification, listener cleanup, and no Redux mutation in the listener |
| Resilience | Loading, empty, invalid-data, and remote error fallbacks where practical |

Run:

~~~bash
npm run test
npm run typecheck
npm run lint
npm run build
npm run verify
~~~

Unit tests can import source modules directly. A same-store integration test is essential because two separately passing remote tests would not prove cross-MFE state sharing. Production build verification separately proves that Federation emits both remote entries and resolves all imports.

## Root Scripts

The root workspace is the single command surface:

- <code>dev</code> starts Host, Catalog, and Cart with coordinated shutdown.
- <code>dev:host</code>, <code>dev:catalog</code>, and <code>dev:cart</code> run applications independently.
- <code>build</code> builds all packages; <code>build:shared</code>, <code>build:host</code>, <code>build:catalog</code>, and <code>build:cart</code> isolate failures.
- <code>test</code> and <code>test:watch</code> run the test suite.
- <code>test:coverage</code> runs the suite with coverage reporting.
- <code>lint</code> and <code>typecheck</code> provide static checks.
- <code>preview</code> serves all production builds for integrated verification.
- <code>preview:host</code>, <code>preview:catalog</code>, and <code>preview:cart</code> isolate a production preview.
- <code>verify</code> provides the complete pre-submission quality gate.

Every command shown in this README must exist in the root manifest; workspace-local scripts are implementation details behind that stable interface.

## Troubleshooting

### A remote does not load

Confirm the remote development server is running, open its <code>/assets/remoteEntry.js</code> URL directly, check the browser Network and Console panels, and verify that the Host remote URL matches the environment. Restart all three servers after changing Federation configuration. A production preview requires remote and Host builds from compatible configurations.

### Invalid hook call or missing React Redux context

Check for duplicate/incompatible React, React DOM, or React Redux instances and inspect the Federation share configuration. Confirm the exposed remote component has no private production Provider and is rendered below the Host Provider. Install from the root so workspace versions stay aligned.

### Add to Cart increments twice

The Catalog click should dispatch <code>addToCart</code> once. The <code>cart:item-added</code> listener may display a message only; remove any reducer dispatch from that listener. Also confirm event listeners are cleaned up on unmount.

### Cart is empty after refresh

Inspect <code>localStorage["mfe:cart"]</code> on the Host origin, check whether Clear Cart or browser privacy settings removed it, and look for malformed-data fallback warnings. Remember that localhost ports are different Web Storage origins: standalone port-5001 data is not the Host port-5000 bucket.

### Recently viewed or currency is missing

For recently viewed data, inspect <code>sessionStorage["mfe:recently-viewed"]</code> in the same tab and origin. For currency, inspect the <code>mfe_currency</code> cookie's domain, path, expiry, SameSite, and Secure rules. Session storage and cookies have different scoping rules.

### Product detail does not appear

Use <code>/catalog?productId=&lt;known-id&gt;</code>, confirm the value matches the product data exactly, and check that navigation preserved the query string. Query values are strings and must be validated.

### Port is already in use

Stop the previous root runner cleanly or the specific process holding ports 5000–5002. If ports are changed, update the remote URLs and this documentation together.

### Tests pass but the Host fails

Source-level component tests do not execute the production remote-loading path. Run the full build, confirm both generated remote entries, start <code>npm run preview</code>, and exercise the composed Host in a browser.

## Screenshots / Demo

No screenshot is claimed to exist until its image file is actually captured. The complete manual procedure is in [docs/screenshots/README.md](docs/screenshots/README.md).

| Evidence | Suggested file | Status before manual capture |
|---|---|---|
| Catalog listing and Add to Cart | <code>docs/screenshots/01-catalog-product-listing.png</code> | Pending |
| Cart quantities and totals | <code>docs/screenshots/02-cart-quantity-total.png</code> | Pending |
| <code>mfe:cart</code> in local storage | <code>docs/screenshots/03-local-storage-cart.png</code> | Pending |
| <code>mfe:recently-viewed</code> in session storage | <code>docs/screenshots/04-session-storage-recently-viewed.png</code> | Pending |
| <code>mfe_currency</code> cookie | <code>docs/screenshots/05-cookie-currency.png</code> | Pending |
| Product query parameter and detail | <code>docs/screenshots/06-query-parameter-product-details.png</code> | Pending |
| Custom-event notification | <code>docs/screenshots/07-custom-event-notification.png</code> | Pending |
| Redux DevTools shared cart | <code>docs/screenshots/08-redux-devtools-shared-cart.png</code> | Pending |

After capture, replace each Pending label with an image link or embedded preview. A short GIF/video may supplement the images, but the repository must not imply that evidence exists when it does not.

## Challenges & Solutions

| Challenge | Solution |
|---|---|
| Prove the state is shared rather than synchronized | Host creates one store and Provider; an integration test mounts both remotes against that exact object |
| Keep remotes independently runnable | Standalone bootstrap files add local wrappers; exposed components remain context consumers |
| Avoid multiple React/Redux contexts | Align and share React, React DOM, React Redux, and Redux Toolkit through Federation |
| Demonstrate Redux and events on one click without duplication | Redux owns the mutation; <code>cart:item-added</code> is notification-only |
| Recover cart state safely | Parse <code>mfe:cart</code> defensively, validate its shape, and fall back to empty state |
| Avoid nested router failures | Host owns composition routing; only standalone bootstraps create local routers |
| Explain missing event notifications | Compose both remotes on <code>/</code> and document that events are lost without an active listener |
| Keep one remote failure from crashing the shell | Use loading fallbacks and per-remote error boundaries |

## Known Limitations

- Product data, checkout, and pricing are client-side demonstrations rather than a production commerce backend.
- The currency cookie is a display preference; it must not be treated as authoritative exchange-rate or pricing data.
- Local and session storage are browser/origin features and do not synchronize authenticated users across devices.
- The same Redux store exists only in one composed page runtime. Independently opened standalone remotes have intentionally separate stores.
- Custom Events have no queue or replay, so an unmounted Cart does not receive a past notification.
- Client-readable storage and cookies are unsuitable for secrets and do not replace server-side authorization or validation.
- Runtime Federation depends on each remote entry and its chunks remaining available and compatible.
- Manual screenshots and final interactive accessibility/browser review remain human evidence steps.

## Future Improvements

- Deploy Host, Catalog, and Cart independently with environment-specific remote manifests.
- Add end-to-end browser tests for remote loading, refresh hydration, navigation, and unavailable-remotes behavior.
- Add the optional cross-tab <code>storage</code> event synchronization while preserving Redux as the local runtime authority.
- Add service-worker/offline support and cache versioning.
- Add a backend cart with authentication, server validation, inventory, and cross-device synchronization.
- Version shared contracts and add runtime schema validation at remote/event/storage boundaries.
- Add observability for remote load failures and performance metrics.
- Add accessible automated checks, responsive visual regression tests, and broader browser coverage.
- Implement optional Wishlist and Authentication MFEs only after all mandatory evidence is complete.

## Conclusion

The architecture demonstrates that cross-MFE communication is a design choice, not a single library decision. Shared Redux provides consistent reactive cart behavior inside the composed Host; local storage restores that state after a refresh; session storage carries tab-lifetime browsing context; a cookie carries a small preference; a query parameter makes product details shareable; and a custom event demonstrates loose runtime notification. Their different persistence, origin, security, lifecycle, and coupling characteristics are deliberately visible so each mechanism can be justified rather than used interchangeably.
