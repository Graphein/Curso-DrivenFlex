function buscarDados() {
  const resposta = axios.get('https://rickandmortyapi.com/api/character/118')
  resposta.then(renderizarPersonagem)
}

function renderizarPersonagem(personagem) {
  var elementoImagem = document.querySelector(".imagem-do-personagem");
  var elementoNome = document.querySelector(".nome");
  var elementoEspecie = document.querySelector(".especie");

  elementoImagem.src = personagem.data.image;
  elementoNome.innerHTML = personagem.data.name;
  elementoEspecie.innerHTML = personagem.data.species;
}
