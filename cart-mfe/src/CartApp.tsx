import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementItem,
  formatCurrency,
  getCurrencyPreference,
  incrementItem,
  removeItem,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  subscribeToCartItemAdded,
  subscribeToCurrencyChanged,
  type AppDispatch,
  type CurrencyCode,
} from "@mfe/shared";

import "./styles.css";

export interface CartAppProps {
  compact?: boolean;
}

const EVENT_NOTICE_DURATION_MS = 4_000;

export default function CartApp({ compact = false }: CartAppProps) {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [currency, setCurrency] = useState<CurrencyCode>(() =>
    getCurrencyPreference(),
  );
  const [eventNotice, setEventNotice] = useState<string | null>(null);

  useEffect(() => {
    let noticeTimer: ReturnType<typeof setTimeout> | undefined;

    const unsubscribe = subscribeToCartItemAdded((eventDetail) => {
      if (noticeTimer) {
        clearTimeout(noticeTimer);
      }

      // The CustomEvent demonstrates loose coupling only. Redux has already
      // performed the cart mutation in Catalog, so this listener must not
      // dispatch another cart action.
      setEventNotice(`${eventDetail.productName} was added to the cart.`);
      noticeTimer = setTimeout(() => {
        setEventNotice(null);
      }, EVENT_NOTICE_DURATION_MS);
    });

    return () => {
      unsubscribe();
      if (noticeTimer) {
        clearTimeout(noticeTimer);
      }
    };
  }, []);

  useEffect(
    () =>
      subscribeToCurrencyChanged(({ currency: nextCurrency }) => {
        setCurrency(nextCurrency);
      }),
    [],
  );

  const itemLabel = totalItems === 1 ? "item" : "items";

  return (
    <section
      className={`cart-mfe${compact ? " cart-mfe--compact" : ""}`}
      aria-labelledby="cart-mfe-title"
    >
      <div className="cart-mfe__ambient" aria-hidden="true" />

      <header className="cart-mfe__header">
        <div>
          <p className="cart-mfe__eyebrow">Your selection</p>
          <h1 id="cart-mfe-title">Shopping cart</h1>
          <p className="cart-mfe__summary" data-testid="cart-summary">
            {totalItems} {itemLabel} in your bag
          </p>
        </div>
        <span className="cart-mfe__currency" aria-label={`Currency ${currency}`}>
          {currency}
        </span>
      </header>

      {eventNotice ? (
        <div className="cart-mfe__notice" role="status" aria-live="polite">
          <span className="cart-mfe__notice-icon" aria-hidden="true">
            ✓
          </span>
          {eventNotice}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="cart-mfe__empty" role="status">
          <span className="cart-mfe__empty-icon" aria-hidden="true">
            ◇
          </span>
          <h2>Your cart is empty</h2>
          <p>Add something from the catalog and it will appear here.</p>
        </div>
      ) : (
        <>
          <ul className="cart-mfe__items" aria-label="Cart items">
            {items.map((item) => (
              <li className="cart-mfe__item" key={item.id}>
                <div className="cart-mfe__item-copy">
                  <h2>{item.name}</h2>
                  <p className="cart-mfe__unit-price">
                    {formatCurrency(item.price, currency)} each
                  </p>
                  <button
                    className="cart-mfe__remove"
                    type="button"
                    onClick={() => dispatch(removeItem(item.id))}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-mfe__item-actions">
                  <div
                    className="cart-mfe__quantity"
                    aria-label={`Quantity for ${item.name}`}
                  >
                    <button
                      type="button"
                      onClick={() => dispatch(decrementItem(item.id))}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <span aria-hidden="true">−</span>
                    </button>
                    <output aria-label={`${item.name} quantity`}>
                      {item.quantity}
                    </output>
                    <button
                      type="button"
                      onClick={() => dispatch(incrementItem(item.id))}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>
                  <strong
                    className="cart-mfe__line-total"
                    data-testid={`line-total-${item.id}`}
                  >
                    {formatCurrency(item.price * item.quantity, currency)}
                  </strong>
                </div>
              </li>
            ))}
          </ul>

          <footer className="cart-mfe__footer">
            <button
              className="cart-mfe__clear"
              type="button"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </button>

            <div className="cart-mfe__totals" aria-live="polite">
              <div>
                <span>Total items</span>
                <strong data-testid="cart-total-items">{totalItems}</strong>
              </div>
              <div className="cart-mfe__grand-total">
                <span>Total</span>
                <strong data-testid="cart-total-price">
                  {formatCurrency(totalPrice, currency)}
                </strong>
              </div>
            </div>
          </footer>
        </>
      )}
    </section>
  );
}
