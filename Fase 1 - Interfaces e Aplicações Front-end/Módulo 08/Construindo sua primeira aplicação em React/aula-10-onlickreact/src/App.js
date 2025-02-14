function selecionarPrimeiraOpcao(escolha) {
  if (escolha === 'bolacha') {
    alert("Você escolheu sabiamente");
  } else if (escolha === 'biscoito') {
    alert("Você escolheu erradamente");
  }
}

function selecionarSegundaOpcao(escolha) {
  if (escolha === 'nescau') {
    alert("Você escolheu sabiamente");
  } else if (escolha === 'toddy') {
    alert("Você escolheu erradamente");
  }
}

export default function App() {
  return (
    <>
      <div class="grupo">
        <h1>Escolha a opção correta</h1>
        <button onClick={()=> selecionarPrimeiraOpcao('bolacha')}>Bolacha</button>
        <button onClick={()=> selecionarPrimeiraOpcao('Biscoito')}>Biscoito</button>
      </div>

      <div class="grupo">
        <h1>Escolha a opção correta</h1>
        <button onClick={()=> selecionarSegundaOpcao('toddy')}>Toddy</button>
        <button onClick={()=> selecionarSegundaOpcao ('nescau')}>Nescau</button>
      </div>
    </>
  );
}
