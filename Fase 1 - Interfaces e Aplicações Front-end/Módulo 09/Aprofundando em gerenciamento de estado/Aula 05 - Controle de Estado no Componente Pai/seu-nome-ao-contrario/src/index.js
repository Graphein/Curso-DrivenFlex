import { createRoot } from "react-dom/client";
import App from "./App";

const elemento = document.querySelector(".root");
const root = createRoot(elemento);
root.render(<App />);
