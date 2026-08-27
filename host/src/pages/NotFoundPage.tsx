import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">404 · Page not found</p>
      <h1>This aisle does not exist.</h1>
      <p>The page may have moved, or the address may have been entered incorrectly.</p>
      <Link className="button button--primary" to="/catalog">
        Browse products
      </Link>
    </section>
  );
}
