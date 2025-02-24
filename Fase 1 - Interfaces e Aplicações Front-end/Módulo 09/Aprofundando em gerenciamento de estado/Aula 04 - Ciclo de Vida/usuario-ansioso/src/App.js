import React from "react";

export default function App() {
  const [numeros, setNumeros] = React.useState([]);

  function verNumerosSorteados() {
    setNumeros([1, 2, 3, 4, 5, 57]);
    alert("Números sorteados: " + numerosSorteados.join(', '));
    setNumeros(numerosSorteados);
  }

  return (
    <div>
      <button onClick={verNumerosSorteados}>Ver números</button>
      {numeros.map((n) => (
        <li>{n}</li>
      ))}
    </div>
  );
}
