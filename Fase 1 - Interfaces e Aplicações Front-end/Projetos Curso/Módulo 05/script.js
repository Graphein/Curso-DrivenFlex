let numero;
let cartasViradas = []; 
let cartasCombinadas = 0; 
let jogadas = 0; 

while (true) {
    numero = parseInt(prompt("Quantas cartas quer jogar? (Escolha um número par entre 4 e 14)"), 10);


    if (numero >= 4 && numero <= 14 && numero % 2 === 0) {
        document.getElementById('overlay').style.display = 'none'; 
        break;
    } else {
        alert("Número inválido! Por favor, insira um número par entre 4 e 14.");
    }
}


const imagensDeFundo = [
    "./img/bobrossparrot.gif",
    "./img/explodyparrot.gif",
    "./img/fiestaparrot.gif",
    "./img/metalparrot.gif",
    "./img/revertitparrot.gif",
    "./img/tripletsparrot.gif",
    "./img/unicornparrot.gif"
];

let cartasParaJogo = imagensDeFundo.slice(0, numero / 2); 
cartasParaJogo = [...cartasParaJogo, ...cartasParaJogo].sort(() => Math.random() - 0.5); 

function criarCartas() {
    const cartasContainer = document.querySelector('.cartas1');
    cartasContainer.innerHTML = '';

    cartasParaJogo.forEach((imagemFundo) => {
        const carta = document.createElement('div');
        carta.classList.add('card');

        carta.innerHTML = `
            <div class="face front-face">
                <img src="./img/back.png" alt="Carta de Fundo">
            </div>
            <div class="face back-face">
                <img src="${imagemFundo}" alt="Imagem de Fundo">
            </div>
        `;

        cartasContainer.appendChild(carta);
    });


    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            virarCarta(card); 
        });
    });
}

function virarCarta(carta) {
    if (carta.classList.contains('flipped') || cartasViradas.length === 2) return;

    carta.classList.add('flipped');
    const imagemFundo = carta.querySelector('.back-face img').src;
    cartasViradas.push({ elemento: carta, imagem: imagemFundo });

    if (cartasViradas.length === 2) {
        jogadas++; 
        verificarPar();
    }
}

function verificarPar() {
    const [carta1, carta2] = cartasViradas;

    if (carta1.imagem === carta2.imagem) {
        cartasViradas = [];
        cartasCombinadas += 2;

        if (cartasCombinadas === numero) {
            alert(`Parabéns! Você encontrou todos os pares em ${jogadas} jogadas!`);
        }
    } else {
        setTimeout(() => {
            carta1.elemento.classList.remove('flipped');
            carta2.elemento.classList.remove('flipped');
            cartasViradas = [];
        }, 1000); 
    }
}
criarCartas();
