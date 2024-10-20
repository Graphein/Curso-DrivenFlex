function calcular() {
	const largura = prompt("Insira a largura da sala");
  const comprimento = prompt("Insira o comprimento da sala");

  const preco = (Number(largura) * Number(comprimento)) * 2 + 700;
  alert("O preço do aluguel é: " + preco);
}