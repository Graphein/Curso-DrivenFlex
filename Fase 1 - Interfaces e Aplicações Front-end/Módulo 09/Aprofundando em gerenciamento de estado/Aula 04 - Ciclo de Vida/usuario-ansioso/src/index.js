import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const elemento = document.getElementById("root");
const root = createRoot(elemento);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
