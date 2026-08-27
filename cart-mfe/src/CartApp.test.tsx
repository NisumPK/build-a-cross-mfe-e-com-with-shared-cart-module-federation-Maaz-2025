import { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { createAppStore, formatCurrency } from "@mfe/shared";

import CartApp from "./CartApp";

const headphones = {
  id: "headphones",
  name: "Wireless Headphones",
  price: 29.99,
  image: "/products/headphones.svg",
  description: "Comfortable wireless headphones.",
  quantity: 2,
};

const keyboard = {
  id: "keyboard",
  name: "Mechanical Keyboard",
  price: 45.5,
  image: "/products/keyboard.svg",
  description: "A compact mechanical keyboard.",
  quantity: 1,
};

function renderCart(items = [headphones, keyboard], compact = false) {
  const preloadedCart = {
    items,
    totalItems: items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: Number(
      items
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2),
    ),
  };
  const store = createAppStore({ storage: null, preloadedCart });

  const result = render(
    <Provider store={store}>
      <MemoryRouter>
        <CartApp compact={compact} />
      </MemoryRouter>
    </Provider>,
  );

  return { ...result, store };
}

describe("CartApp", () => {
  it("renders an accessible empty-cart state", () => {
    renderCart([]);

    expect(
      screen.getByRole("heading", { name: /your cart is empty/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("cart-summary")).toHaveTextContent(
      "0 items in your bag",
    );
  });

  it("renders items, quantities, total items, and a calculated total", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { name: headphones.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: keyboard.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`${headphones.name} quantity`),
    ).toHaveTextContent("2");
    expect(screen.getByTestId("cart-total-items")).toHaveTextContent("3");
    expect(screen.getByTestId("cart-total-price")).toHaveTextContent(
      formatCurrency(105.48, "USD"),
    );
  });

  it("increases an item's quantity and updates derived totals", async () => {
    const user = userEvent.setup();
    const { store } = renderCart([keyboard]);

    await user.click(
      screen.getByRole("button", {
        name: `Increase ${keyboard.name} quantity`,
      }),
    );

    expect(store.getState().cart.items[0]?.quantity).toBe(2);
    expect(screen.getByTestId("cart-total-items")).toHaveTextContent("2");
    expect(screen.getByTestId("cart-total-price")).toHaveTextContent(
      formatCurrency(91, "USD"),
    );
  });

  it("decreases an item's quantity and updates derived totals", async () => {
    const user = userEvent.setup();
    const { store } = renderCart([headphones]);

    await user.click(
      screen.getByRole("button", {
        name: `Decrease ${headphones.name} quantity`,
      }),
    );

    expect(store.getState().cart.items[0]?.quantity).toBe(1);
    expect(screen.getByTestId("cart-total-items")).toHaveTextContent("1");
    expect(screen.getByTestId("cart-total-price")).toHaveTextContent(
      formatCurrency(29.99, "USD"),
    );
  });

  it("removes a selected item", async () => {
    const user = userEvent.setup();
    const { store } = renderCart();

    await user.click(
      screen.getByRole("button", {
        name: `Remove ${headphones.name} from cart`,
      }),
    );

    expect(store.getState().cart.items).toHaveLength(1);
    expect(
      screen.queryByRole("heading", { name: headphones.name }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: keyboard.name }),
    ).toBeInTheDocument();
  });

  it("clears every cart item", async () => {
    const user = userEvent.setup();
    const { store } = renderCart();

    await user.click(screen.getByRole("button", { name: /clear cart/i }));

    expect(store.getState().cart.items).toEqual([]);
    expect(
      screen.getByRole("heading", { name: /your cart is empty/i }),
    ).toBeInTheDocument();
  });

  it("uses a CustomEvent only for notification and does not mutate Redux", async () => {
    const { store } = renderCart([]);

    act(() => {
      window.dispatchEvent(
        new CustomEvent("cart:item-added", {
          detail: {
            productId: keyboard.id,
            productName: keyboard.name,
            quantity: 1,
          },
        }),
      );
    });

    expect(
      await screen.findByText(`${keyboard.name} was added to the cart.`),
    ).toHaveTextContent(
      `${keyboard.name} was added to the cart.`,
    );
    expect(store.getState().cart.totalItems).toBe(0);
    expect(store.getState().cart.items).toEqual([]);
  });

  it("unsubscribes from cart events when it unmounts", () => {
    const removeListener = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderCart([]);

    unmount();

    expect(removeListener).toHaveBeenCalledWith(
      "cart:item-added",
      expect.any(Function),
    );
    removeListener.mockRestore();
  });

  it("reads the currency cookie and responds to currency events", () => {
    document.cookie = "mfe_currency=EUR; Path=/; SameSite=Lax";
    renderCart([]);

    expect(screen.getByLabelText("Currency EUR")).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(
        new CustomEvent("currency:changed", {
          detail: { currency: "GBP" },
        }),
      );
    });

    expect(screen.getByLabelText("Currency GBP")).toBeInTheDocument();
  });

  it("supports compact rendering without changing its functionality", () => {
    const { container } = renderCart([keyboard], true);

    expect(container.querySelector(".cart-mfe--compact")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Increase ${keyboard.name} quantity`,
      }),
    ).toBeEnabled();
  });
});
