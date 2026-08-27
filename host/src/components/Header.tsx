import { selectTotalItems } from "@mfe/shared";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function navClassName({ isActive }: { isActive: boolean }) {
  return isActive ? "site-nav__link site-nav__link--active" : "site-nav__link";
}

export function Header() {
  const totalItems = useSelector(selectTotalItems);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="brand" to="/" aria-label="Northstar Market home">
          <span className="brand__mark" aria-hidden="true">
            N
          </span>
          <span>
            <span className="brand__name">Northstar</span>
            <span className="brand__tagline">Everyday goods, thoughtfully picked</span>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          <NavLink className={navClassName} to="/" end>
            Home
          </NavLink>
          <NavLink className={navClassName} to="/catalog">
            Catalog
          </NavLink>
          <NavLink className={navClassName} to="/cart">
            <span>Cart</span>
            <span
              className="cart-badge"
              aria-label={`${totalItems} ${totalItems === 1 ? "item" : "items"} in cart`}
            >
              {totalItems}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
