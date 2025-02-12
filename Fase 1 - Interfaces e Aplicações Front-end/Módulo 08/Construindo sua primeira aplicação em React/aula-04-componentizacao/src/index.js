import ReactDOM from "react-dom";

function Topo()
{
  return
  ( 
     <div class="topo">Minha página linda</div>
  );
}

function SobreMim(){
  return(
      <div class="SobreMim">
      <h2>Sobre Mim</h2>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.
    </div>
  );
}
function SaibaMais(){
  return(
    <div class="SaibaMais">
    <h2>Saiba Mais</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum
  </div>
  );
}
function Rodape(){
  return(
    <div class="rodape">Copyright 2021. Todos os direitos reservados.</div>
  );
}
function Corpo() {
    return (
      <div className="corpo">
        <SobreMim />
        <SaibaMais />
      </div> // Crie a função que define o componente Corpo e inclua os componentes SobreMim e SaibaMais
    );
  }
function App() {
    return (
      <div>
        <Topo />
        <Corpo />
        <Rodape />
      </div> // Crie a função que define o componente App e inclua os componentes Topo, Corpo e Rodape
    );
  }
ReactDOM.render(<App />, document.querySelector(".root")); // Renderize o componente App dentro do elemento da página que tem a classe root
