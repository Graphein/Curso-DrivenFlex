const listPokemons = [
  {
    name: "Bulbasaur",
    type: "grass",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    health: 90,
  },
  {
    name: "Charmander",
    type: "fire",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
    health: 98,
  },
  {
    name: "Squirtle",
    type: "water",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
    health: 88,
  },
  {
    name: "Blastoise",
    type: "water",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png",
    health: 100,
  },
  {
    name: "Charizard",
    type: "fire",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
    health: 110,
  },
];

function PokemonDiv(pokemon) {
  return `
    <div class="pokemon">  
      <img class="profile" src="${pokemon.img}">
      <span class="${pokemon.type}">${pokemon.name}</span>
      <div class="health">
        <img src="https://static.vecteezy.com/system/resources/previews/041/638/510/non_2x/ai-generated-pixelation-of-red-heart-in-image-free-png.png">
        <span>${pokemon.health}</span>
        </div>
    </div>
  `;
}

function renderizarPokemons(pokemons) {
  let app = document.querySelector(".app");
  app.innerHTML = "";

  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    app.innerHTML += PokemonDiv(pokemon);
  }
}

filtrarPokemonsFogo()

// ------------------
// filtrarPokemonsFogo()
// Começamos utilizando o método filter para selecionar apenas os Pokémons do tipo fogo. Para fazer isso podemos criar uma função 
// que vamos passar para o método filter que vai dizer se o Pokémon é do tipo fogo ou não. Na função filtrarPokemonsFogo, 
// vamos criar um novo array com esses Pokémon de fogo que serão então renderizados na página

function filtrarPokemonsFogo() {
  function avaliar(pokemon){
    return pokemon.type === 'fire'
  }
  const pokemonsFogo = listPokemons.filter(avaliar);
  renderizarPokemons(pokemonsFogo);
}

// ------------------
// aumentarHealthPokemons()
// Na função aumentarHealthPokemons, o método map deve ser aplicado para aumentar a saúde de cada Pokémon em 20 pontos. 
// Vamos fazer o mesmo processo de criar a função que passaremos para o map aplicar a cada Pokémon. Após modificar a propriedade 
// de saúde, a lista atualizada será exibida novamente:


function aumentarHealthPokemons() {
  function aumentaVida(pokemon) {
    pokemon.health += 20;
    return pokemon
  }
  const pokemonsComMaisVida = listPokemons.map(aumentaVida);
  renderizarPokemons(pokemonsComMaisVida);
}

//---------------
// buscarPrimeiroPokemonAgua()
// Para encontrar o primeiro Pokémon do tipo água, a função buscarPrimeiroPokemonAgua pode ser escrita utilizando o método find. 
// Vamos precisar passar a função que determina qual o critério para achar o pokemon que queremos, nesse caso, o primeiro de água. 
// Esse Pokémon será colocado em um novo array e passado para a função de renderização para ser exibido na página:

function buscarPrimeiroPokemonAgua() {
  function ehPokemonAgua(pokemon) {
    return pokemon.type === 'water'
  }
  const primeiroPokemonAgua = listPokemons.find(ehPokemonAgua);

  renderizarPokemons([primeiroPokemonAgua]);
}

// Remova os comentários para testar as funções implementadas
//filtrarPokemonsFogo();
aumentarHealthPokemons();
//buscarPrimeiroPokemonAgua();
