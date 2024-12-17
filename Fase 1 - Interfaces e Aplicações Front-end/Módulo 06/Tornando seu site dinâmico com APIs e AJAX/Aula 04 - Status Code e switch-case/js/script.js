function consultarCep() {
  const cep = document.querySelector(".cep").value;

  const promessa = axios.get(`https://opencep.com/v1/${cep}`);

  promessa.then(cepAchadoComSucesso);
  promessa.catch(tratarErro);
}

function cepAchadoComSucesso(res) {
  const divImagem = (document.querySelector(".imagem-erro").innerHTML = "");
  alert(`Você mora em ${res.data.logradouro}`);
}
function tratarErro(err) {
  const divImagem = document.querySelector(".imagem-erro");

  divImagem.innerHTML = "<img src='./img/error.jpg'/>";
}
