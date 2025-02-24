import { useState } from "react";
import "./style.css";

function InserirNome ()
{
     return <input value={nome} onChange={(e) => setNome(e.target.value)} />
}
function MostrarNome(){
  return <h2>{nome.split("").reverse().join("")}</h2>;
}
export default function App() {
  const [nome, setNome] = useState("");

  return (
    <div className="conteudo">
      <h1>Seu nome ao contrário!</h1>
      <InserirNome nome={nome} setNome={setNome} />
      <MostrarNome nome={nome} />
    </div>
  );
}
