const novaMega = megaSena.map((n) => n * 2);
console.log(novaMega); // Resultado: [16, 28, 56, 66, 90, 118]

const nomesProfs = profsDriven.map((p) => p.nome);
console.log(nomesProfs); 

// Resultado: ["Diego", "Frank", "Lele", "Let", "Mr. Pink", "Thi Code"]


const coresLi = profsDriven.map(
    (p) => `<li>A cor favorita de ${p.nome} é ${p.corFavorita}</li>`
  );
  console.log(coresLi);
  // Resultado: [
  //   "<li>A cor favorita de Diego é Preto</li>",
  //   "<li>A cor favorita de Frank é Roxo</li>",
  //   "<li>A cor favorita de Lele é Vermelho</li>",
  //   "<li>A cor favorita de Let é Azul</li>",
  //   "<li>A cor favorita de Mr. Pink é Rosa</li>",
  //   "<li>A cor favorita de Thi Code é Verde</li>"
  // ]