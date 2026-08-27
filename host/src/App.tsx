import type { ReactNode } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Header } from "./components/Header";
import { RemoteBoundary } from "./components/RemoteBoundary";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CartApp, CatalogApp } from "./remotes";

function RemotePage({
  children,
  description,
  eyebrow,
  name,
  resetKey,
  title,
}: {
  children: ReactNode;
  description: string;
  eyebrow: string;
  name: string;
  resetKey: string;
  title: string;
}) {
  return (
    <section className="page-section" aria-labelledby={`${name.toLowerCase()}-page-title`}>
      <header className="page-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id={`${name.toLowerCase()}-page-title`}>{title}</h1>
        <p>{description}</p>
      </header>
      <div className="content-panel">
        <RemoteBoundary name={name} resetKey={resetKey}>
          {children}
        </RemoteBoundary>
      </div>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  const resetKey = `${location.pathname}${location.search}`;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="main-content">
        <Routes>
          <Route path="/" element={<HomePage resetKey={resetKey} />} />
          <Route
            path="/catalog"
            element={
              <RemotePage
                eyebrow="Catalog micro frontend"
                title="Discover useful things"
                description="Select a product to see its bookmarkable details, or add it to the shared cart."
                name="Catalog"
                resetKey={resetKey}
              >
                <CatalogApp />
              </RemotePage>
            }
          />
          <Route
            path="/cart"
            element={
              <RemotePage
                eyebrow="Cart micro frontend"
                title="Your shopping cart"
                description="Change quantities, remove products, and review totals calculated from shared Redux state."
                name="Cart"
                resetKey={resetKey}
              >
                <CartApp />
              </RemotePage>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>Northstar Market</span>
        <span>Host · Catalog MFE · Cart MFE</span>
      </footer>
    </div>
  );
}
