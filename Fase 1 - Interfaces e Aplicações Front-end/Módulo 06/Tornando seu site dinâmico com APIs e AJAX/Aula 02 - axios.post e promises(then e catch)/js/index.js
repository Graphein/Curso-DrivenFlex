function perguntar() {
  var resposta = document.querySelector(".resposta");
  resposta.innerHTML = "Carregando resposta...";

  const pergunta = document.querySelector(".pergunta").value;

  const promise  = axios.post
  ("https://mock-api.driven.com.br/api/v2/yesno", { pergunta: pergunta }
  );

  promise.then(quandoSucesso); 
  promise.catch(quandoErro);

}

function quandoSucesso(response) {
  const simOuNao = response.data.resposta;
  const imagem = response.data.imagem;

  criarSimOuNao(simOuNao, imagem);
}

function quandoErro(erro) {
  const elementoResposta = document.querySelector(".resposta");
  elementoResposta.innerHTML = "A pergunta está vazia!";
}

// esta função insere na tela uma imagem com a resposta em cima
function criarSimOuNao(simOuNao, imagem) {
  const elementoResposta = document.querySelector(".resposta");

  elementoResposta.innerHTML = `
    <img src="${imagem}">
    <div>${simOuNao}</div>
  `;
}
