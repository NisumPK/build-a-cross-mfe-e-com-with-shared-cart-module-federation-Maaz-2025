declare module "catalog/CatalogApp" {
  import type { ComponentType } from "react";

  const CatalogApp: ComponentType;
  export default CatalogApp;
}

declare module "cart/CartApp" {
  import type { ComponentType } from "react";

  export interface CartAppProps {
    compact?: boolean;
  }

  const CartApp: ComponentType<CartAppProps>;
  export default CartApp;
}
