import { createRoot } from "react-dom/client";

import Navbar from "./components/Navbar";
import Conteudo from "./components/Conteudo";
import Rodape from "./components/Rodape";

function App() {
  return (
    <div>
      <Navbar />
      <Conteudo />
      <Rodape />
    </div>
  );
}

const elemento = document.querySelector(".root");
const root = createRoot(elemento);
root.render(<App />);




