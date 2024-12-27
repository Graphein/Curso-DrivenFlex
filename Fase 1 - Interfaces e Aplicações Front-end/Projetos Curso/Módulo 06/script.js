// Configuração do UUID fixo (substitua pelo seu UUID)
const uuidFixo = '4854cc72-fbb8-4191-b618-642acd1cd5bb'; // Substitua com o seu UUID real
let userName = "";

// Função para entrar na sala com o nome do usuário
function entrarNaSala(nome) {
    const url = `https://mock-api.driven.com.br/api/v6/uol/participants/${uuidFixo}`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nome }),
    })
    .then((response) => {
        if (response.ok) {
            console.log("Usuário entrou na sala com sucesso.");
            // Atualiza a lista de participantes online
            document.querySelector('#participantesOnline').innerHTML += `
                <div>${nome} </div>
            `;
            // Chama a função para buscar os participantes
            buscarParticipantes();
        } else {
            alert("Este nome já está em uso. Por favor, escolha outro.");
            userName = ""; // Reseta o nome para solicitar novamente
            window.location.reload();
        }
    })
    .catch((error) => {
        console.error("Erro ao entrar na sala:", error);
    });
}

// Solicita o nome do usuário ao carregar a página
while (!userName) {
    userName = prompt("Qual o seu nome?");
    if (!userName) {
        alert("Por favor, insira um nome válido.");
    }
}

// Entra na sala com o nome escolhido
entrarNaSala(userName);

// Função para manter a conexão ativa
function manterConexaoAtiva() {
    const url = `https://mock-api.driven.com.br/api/v6/uol/status/${uuidFixo}`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName }),
    })
    .then(response => {
        if (response.ok) {
            console.log("Conexão mantida.");
        } else {
            console.log("Falha ao manter a conexão.");
        }
    })
    .catch(error => {
        console.error("Erro ao manter a conexão ativa:", error);
    });
}

// Manter a conexão ativa a cada 5 segundos
setInterval(manterConexaoAtiva, 5000);

// Função para buscar os participantes
function buscarParticipantes() {
    const url = `https://mock-api.driven.com.br/api/v6/uol/participants/${uuidFixo}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const listaParticipantes = document.getElementById('participantesOnline');
            listaParticipantes.innerHTML = ''; // Limpa a lista antes de adicionar novamente

            // Adiciona o nome do usuário atual (Você)
            listaParticipantes.innerHTML += `
                <div>
                    <ion-icon name="person-circle"></ion-icon> ${userName}
                    <span class="check-icon" style="display: none;">✓</span> 
                </div>
            `;

            // Adiciona os outros participantes com ícones
            data.forEach(participante => {
                if (participante.name !== userName) {  // Evita adicionar o nome do próprio usuário
                    listaParticipantes.innerHTML += `
                        <div onclick="selecionarContato(this)">
                            <ion-icon name="person-circle"></ion-icon> ${participante.name}
                            <span class="check-icon" style="display: none;">✓</span>
                        </div>
                    `;
                }
            });
        })
        .catch(error => console.error("Erro ao buscar participantes:", error));
}

// Atualiza a lista de participantes a cada 3 segundos
setInterval(buscarParticipantes, 3000);

// Função para buscar as mensagens
function buscarMensagens() {
    const url = `https://mock-api.driven.com.br/api/v6/uol/messages/${uuidFixo}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar mensagens');
            }
            return response.json();
        })
        .then(data => {
            renderizarMensagens(data);
        })
        .catch(error => console.error('Erro:', error));
}

// Função para renderizar as mensagens no chat
function renderizarMensagens(mensagens) {
    const containerMensagens = document.querySelector('.mensagem');
    containerMensagens.innerHTML = ''; // Limpa mensagens antigas para evitar duplicações

    mensagens.forEach(mensagem => {
        const novaMensagem = document.createElement('div');
        
        if (mensagem.type === 'status') {
            novaMensagem.classList.add('message', 'status'); // Classe de status
            novaMensagem.innerHTML = ` 
                <span class="time">${mensagem.time}</span>
                <span class="from">${mensagem.from}</span>
                <span class="text">${mensagem.text}</span>
            `;
        } else if (mensagem.type === 'message') {
            novaMensagem.classList.add('message', 'user'); // Classe de mensagem de chat
            novaMensagem.innerHTML = `
                <span class="time">${mensagem.time}</span>
                <span class="from">${mensagem.from}</span>
                ${mensagem.to ? `<span class="to">para ${mensagem.to}:</span>` : ''}
                <span class="text">${mensagem.text}</span>
            `;
        } else if (mensagem.type === 'private_message') {
            // Se for mensagem privada, aplica a classe para exibir fundo vermelho
            novaMensagem.classList.add('message', 'private');
            novaMensagem.innerHTML = `
                <span class="time">${mensagem.time}</span>
                <span class="from">${mensagem.from}</span>
                <span class="to">para ${mensagem.to}:</span>
                <span class="text">${mensagem.text}</span>
            `;
        }

        containerMensagens.appendChild(novaMensagem);
    });

    // Rolagem automática para a última mensagem
    const ultimaMensagem = containerMensagens.lastElementChild;
    if (ultimaMensagem) {
        ultimaMensagem.scrollIntoView();
    }
}


// Atualiza as mensagens a cada 3 segundos
document.addEventListener('DOMContentLoaded', () => {
    buscarMensagens(); // Carrega as mensagens inicialmente
    setInterval(buscarMensagens, 3000); // Atualiza as mensagens a cada 3 segundos
});

// Função para enviar a mensagem
let visibility = "public";  // Variável para armazenar a visibilidade da mensagem

function enviarMensagem() {
    const input = document.getElementById('msg');
    const mensagem = input.value.trim(); // Captura e remove espaços extras

    if (mensagem === '') {
        alert('Por favor, escreva uma mensagem!');
        return;
    }

    const time = new Date().toLocaleTimeString(); // Obtém a hora atual
    const destinatarioTexto = document.getElementById('destinatario-texto').textContent;

    // Envia a mensagem para o servidor
    const mensagemData = {
        from: userName,
        to: destinatarioTexto === 'Todos (público)' ? 'Todos' : destinatarioTexto.replace(' (reservadamente)', ''),
        text: mensagem,
        type: visibility === "private" ? "private_message" : "message",  // Tipo de mensagem
    };

    const url = `https://mock-api.driven.com.br/api/v6/uol/messages/${uuidFixo}`;
    
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mensagemData),
    })
    .then(response => {
        if (response.ok) {
            console.log("Mensagem enviada com sucesso.");
        } else {
            alert("Erro ao enviar a mensagem.");
        }
    })
    .catch(error => {
        console.error("Erro ao enviar mensagem:", error);
    });

    // Adiciona a mensagem na interface do usuário com um pequeno atraso
    setTimeout(() => {
        const containerMensagens = document.querySelector('.mensagem');
        const novaMensagem = document.createElement('div');

        // Se for mensagem privada, aplica o fundo vermelho
        if (visibility === "private") {
            novaMensagem.classList.add('message', 'private'); // Classe para mensagem privada
            novaMensagem.innerHTML = `
                <span class="time">${time}</span>
                <span class="from">${userName}</span>
                <span class="to">para ${destinatarioTexto.replace(' (reservadamente)', '')}:</span>
                <span class="text">${mensagem}</span>
            `;
        } else {
            novaMensagem.classList.add('message', 'user'); // Classe para mensagem pública
            novaMensagem.innerHTML = `
                <span class="time">${time}</span>
                <span class="from">${userName}</span>
                <span class="text">${mensagem}</span>
            `;
        }

        containerMensagens.appendChild(novaMensagem);
        containerMensagens.scrollTop = containerMensagens.scrollHeight; // Rola para o final
    }, 2000); // Atraso de 2 segundos (2000ms)

    // Limpa o campo de entrada após o envio
    input.value = '';
}
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

// Função para exibir e esconder o ícone de check dependendo da seleção
function selecionarContato(element) {
    // Esconde todos os ícones de seleção
    const checkIcons = document.querySelectorAll('.check-icon');
    checkIcons.forEach(icon => icon.style.display = 'none');

    // Exibe o ícone de check no item clicado
    const checkIcon = element.querySelector('.check-icon');
    if (checkIcon) {
        checkIcon.style.display = 'inline';  // Exibe o ícone de seleção do item clicado
    }

    // Define o destinatário da mensagem (nome do participante ou "Todos")
    const recipient = element.querySelector("span").textContent.trim();  // Captura o nome do participante
    
    // Atualiza a informação do destinatário na UI
    const destinatarioTexto = document.getElementById('destinatario-texto');
    const publicoElemento = document.querySelector('.publico');  // A tag <h1> onde está a informação do destinatário

    if (destinatarioTexto && publicoElemento) {
        if (recipient === 'Todos') {
            // Se for "Todos", mantém como público
            destinatarioTexto.textContent = 'Todos (público)';
            publicoElemento.classList.remove('reservado');
            publicoElemento.classList.add('publico');
            destinatarioTexto.textContent = 'Todos (público)';
        } else {
            // Se for um participante específico, torna como reservado
            destinatarioTexto.textContent = `${recipient} (reservadamente)`;
            publicoElemento.classList.remove('publico');
            publicoElemento.classList.add('reservado');
        }
    } else {
        console.error("Elemento destinatario-texto ou publico não encontrado!");
    }

    console.log("Destinatário selecionado:", recipient);  // Aqui você pode fazer a lógica necessária com o destinatário
}

// Atualiza a lista de participantes no início
buscarParticipantes();

// Função para selecionar a visibilidade
function selecionarVisibilidade(element) {
    const checkIcons = document.querySelectorAll('.check-icon2');
    checkIcons.forEach(icon => icon.style.display = 'none'); // Esconde os ícones de seleção

    const checkIcon = element.querySelector('.check-icon2');
    checkIcon.style.display = 'inline'; // Exibe o ícone de seleção

    visibility = element.querySelector("span").textContent === "Público" ? "public" : "private"; // Define a visibilidade
}
