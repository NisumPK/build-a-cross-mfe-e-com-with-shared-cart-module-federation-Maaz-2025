import { Link } from "react-router-dom";

import { RemoteBoundary } from "../components/RemoteBoundary";
import { CartApp, CatalogApp } from "../remotes";

export function HomePage({ resetKey }: { resetKey: string }) {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero__content">
          <p className="eyebrow">Independent experiences, one seamless shop</p>
          <h1 id="home-title">Find your next everyday favorite.</h1>
          <p>
            Browse a catalog delivered by one micro frontend and see your shared
            cart update instantly in another.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/catalog">
              Explore the catalog
            </Link>
            <Link className="text-link" to="/cart">
              Review your cart <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <span className="hero__orb hero__orb--large" />
          <span className="hero__orb hero__orb--small" />
          <span className="hero__parcel">N</span>
        </div>
      </section>

      <div className="home-layout">
        <section className="content-panel" aria-labelledby="featured-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Browse</p>
              <h2 id="featured-title">Featured products</h2>
            </div>
            <Link className="text-link" to="/catalog">
              View catalog <span aria-hidden="true">→</span>
            </Link>
          </div>
          <RemoteBoundary name="Catalog" resetKey={`home-catalog-${resetKey}`}>
            <CatalogApp />
          </RemoteBoundary>
        </section>

        <aside className="content-panel content-panel--cart" aria-labelledby="cart-summary-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Shared state</p>
              <h2 id="cart-summary-title">Cart at a glance</h2>
            </div>
          </div>
          <RemoteBoundary name="Cart" resetKey={`home-cart-${resetKey}`}>
            <CartApp compact />
          </RemoteBoundary>
        </aside>
      </div>
    </>
  );
}
