const lista = [1];

function colocarListaNaTela() {
  const container = document.querySelector(".container");
  container.innerHTML = lista;
}

function aumentarLista() {
  const ultimoElemento = lista[lista.length - 1];

  // Calcula a próxima potência de 2 multiplicando o último elemento por 2
  const proximaPotenciaDeDois = ultimoElemento * 2;

  // Insere o resultado da multiplicação acima à lista
  lista.push(proximaPotenciaDeDois);

  colocarListaNaTela();
}

colocarListaNaTela();
