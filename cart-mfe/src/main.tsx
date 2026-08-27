import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createAppStore } from "@mfe/shared";

import CartApp from "./CartApp";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Unable to start Cart MFE: #root was not found.");
}

const standaloneStore = createAppStore();

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={standaloneStore}>
      <BrowserRouter>
        <CartApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
