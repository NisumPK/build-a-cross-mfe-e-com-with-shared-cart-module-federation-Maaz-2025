import { lazy } from "react";

export const CatalogApp = lazy(() => import("catalog/CatalogApp"));
export const CartApp = lazy(() => import("cart/CartApp"));
