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

// filtrarPokemonsFogo()
// Nesta função, utilizamos o método filter. Para transformar ele em arrow function, 
// basta substituir o nome da função avaliar() na chamada do filter diretamente pela arrow 
// function desejada. O código ficará da seguinte forma:


function filtrarPokemonsFogo() {
  const pokemonsFogo = listPokemons.filter(
    (pokemon) => pokemon.type === "fire"
  );
  
  renderizarPokemons(pokemonsFogo);
}


// aumentarHealthPokemons()
// Seguindo a mesma ideia da função anterior, basta substituir o nome da função diretamente pela arrow function. 
// Nesta função vale ressaltar que é necessário ter o return para que o novo array seja criado corretamente.

function aumentarHealthPokemons() {
  const pokemonsComMaisVida = listPokemons.map((pokemon) => {
    pokemon.health += 20;
    return pokemon;
  });

  renderizarPokemons(pokemonsComMaisVida);
}

// buscarPrimeiroPokemonAgua()
// E por fim, seguindo a mesma ideia dos anteriores, removemos a função que existia 
// previamente e chamamos diretamente a arrow function.

function buscarPrimeiroPokemonAgua() {
  const primeiroPokemonAgua = listPokemons.find(
    (pokemon) => pokemon.type === "water"
  );

  renderizarPokemons([primeiroPokemonAgua]);
}

// Remova os comentários para testar as funções implementadas
// filtrarPokemonsFogo();
// aumentarHealthPokemons();
// buscarPrimeiroPokemonAgua();
