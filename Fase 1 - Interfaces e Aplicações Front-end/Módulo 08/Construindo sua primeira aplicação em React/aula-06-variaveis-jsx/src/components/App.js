export default function App() {
  const nome = prompt("Qual o seu nome?") || "Anônimo";

  return (
    <div>
      <div class="wordart rainbow">
        <div class="text">Bem vindo, {nome}!</div>
      </div>
      <div class="wordart blues">
        <div class="text">Como vai você?</div>
      </div>
    </div>
  );
}
