function perguntarPensamentos() {

    let pensamentos = [];
    let pensamento = prompt("Digite um pensamento de Emanuel:");

    while (pensamento !== "fim")
    {
        pensamentos.push(pensamento);
        adicionarPensamento(pensamento);
        pensamento = prompt("Digite é outro pensamento de Emanuel:");
    }
  }
  
  function adicionarPensamento(pensamento) {
    const elemento = document.querySelector("ul");
    elemento.innerHTML = elemento.innerHTML + `<li>${pensamento}</li>`;
  }
  
  perguntarPensamentos();
  