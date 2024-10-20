let selecao = {
    prato: null,
    bebida: null,
    sobremesa: null
};

function selecionarItem(elemento, tipo) {
    if (selecao[tipo]) {
        selecao[tipo].classList.remove("selecionado");
    }

    elemento.classList.add("selecionado");
    selecao[tipo] = elemento;

    verificarSelecoes();
}

function verificarSelecoes() {
    if (selecao.prato && selecao.bebida && selecao.sobremesa) {
        document.querySelector(".botão a").innerHTML = "Fechar Pedido";
        document.querySelector(".botão").style.backgroundColor = "green";
    } else {
        document.querySelector(".botão a").innerHTML = "Selecione os 3 itens<br> para fechar o pedido";
        document.querySelector(".botão").style.backgroundColor = "";
    }
}

function abrirModal() {
    if (selecao.prato && selecao.bebida && selecao.sobremesa) {

        const pratoNome = selecao.prato.querySelector('h4').innerText;
        const pratoPreco = selecao.prato.querySelector('h6').innerText;
        const bebidaNome = selecao.bebida.querySelector('h4').innerText;
        const bebidaPreco = selecao.bebida.querySelector('h6').innerText;
        const sobremesaNome = selecao.sobremesa.querySelector('h4').innerText;
        const sobremesaPreco = selecao.sobremesa.querySelector('h6').innerText;


        const total = (
            parseFloat(pratoPreco) +
            parseFloat(bebidaPreco) +
            parseFloat(sobremesaPreco)
        ).toFixed(2);
        
        document.getElementById('prato-selecionado').innerText = `${pratoNome}: ${pratoPreco}`;
        document.getElementById('bebida-selecionada').innerText = `${bebidaNome}: ${bebidaPreco}`;
        document.getElementById('sobremesa-selecionada').innerText = `${sobremesaNome}: ${sobremesaPreco}`;
        document.getElementById('total').innerText = total;


        document.getElementById('modal').style.display = 'flex';
    }
}

function confirmarPedido() {

    const pratoNome = selecao.prato.querySelector('h4').innerText;
    const bebidaNome = selecao.bebida.querySelector('h4').innerText;
    const sobremesaNome = selecao.sobremesa.querySelector('h4').innerText;
    
    const total = (
        parseFloat(selecao.prato.querySelector('h6').innerText) +
        parseFloat(selecao.bebida.querySelector('h6').innerText) +
        parseFloat(selecao.sobremesa.querySelector('h6').innerText)
    ).toFixed(2);
    

    const mensagem = `Olá, gostaria de fazer o pedido:%0A- Prato: ${pratoNome}%0A- Bebida: ${bebidaNome}%0A- Sobremesa: ${sobremesaNome}%0ATotal: ${total}`;
    

    const numeroRestaurante = '5518997185361'; 
    const urlWhatsApp = `https://wa.me/${numeroRestaurante}?text=${mensagem}`;
    
    window.open(urlWhatsApp, '_blank');
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}
