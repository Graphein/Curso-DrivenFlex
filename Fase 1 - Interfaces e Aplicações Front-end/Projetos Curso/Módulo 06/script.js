
// Função para abrir o modal de seleção
function abrirModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex"; // Mostra o modal
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; // Oculta o modal
}
// Adiciona um evento de clique no fundo (overlay) para fechar o modal
document.getElementById("modal").addEventListener("click", function (event) {
    if (event.target === this) { // Verifica se clicou no fundo, não no modal
        fecharModal();
    }
});

// Função que esconde ou exibe o ícone de check dependendo da seleção
function selecionarContato(element) {
    const checkIcons = document.querySelectorAll('.check-icon');
    checkIcons.forEach(icon => icon.style.display = 'none'); // Esconde todos os ícones de seleção

    const checkIcon = element.querySelector('.check-icon');
    checkIcon.style.display = 'inline'; // Exibe o ícone de seleção do item clicado
    recipient = element.querySelector("span").textContent; // Define o destinatário da mensagem
}

// Função para selecionar a visibilidade
function selecionarVisibilidade(element) {
    const checkIcons = document.querySelectorAll('.check-icon2');
    checkIcons.forEach(icon => icon.style.display = 'none'); // Esconde os ícones de seleção

    const checkIcon = element.querySelector('.check-icon2');
    checkIcon.style.display = 'inline'; // Exibe o ícone de seleção

    visibility = element.querySelector("span").textContent === "Público" ? "public" : "private"; // Define a visibilidade
}