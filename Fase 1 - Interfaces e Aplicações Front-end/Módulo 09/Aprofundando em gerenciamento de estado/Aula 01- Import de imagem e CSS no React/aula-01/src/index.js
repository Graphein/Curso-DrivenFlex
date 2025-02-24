import { createRoot } from "react-dom/client";
import cao from "./img/cao.png"
import gato from "./img/gato.png"
import "./css/reset.css"
import "./css/style.css"

function App() {
  return (
    <div class="page">
      <div class="member">
        <div class="info">
          <img src={cao}/>
          <div class="name">Cão</div>
        </div>
      </div>

      <div class="member">
        <div class="info">
          <img src={gato}/>
          <div class="name">Gato</div>
        </div>
      </div>
    </div>
  );
}

const elemento = document.querySelector(".root");
const root = createRoot(elemento);
root.render(<App />);