const listaPokemons = document.querySelector("#listapokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 250; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(data) {
  let pokeID = data.id.toString();

  if (pokeID.length === 1) {
    pokeID = "00" + pokeID;
  } else if (pokeID.length === 2) {
    pokeID = "0" + pokeID;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
        <p class="pokemon-id-back">#${pokeID}</p>
        <div class="pokemon-imagen">
            <img
                src="${data.sprites.other["official-artwork"].front_default}"
                alt="${data.name}"
            />
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeID}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${data.types
                  .map(
                    (tipo) =>
                      `<p class="${
                        tipo.type.name
                      } tipo">${tipo.type.name.toUpperCase()}</p>`
                  )
                  .join("")}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${data.height / 10}m</p>
                <p class="stat">${data.weight / 10}kg</p>
            </div>
        </div>
    `;
  listaPokemons.appendChild(div);
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemons.innerHTML = "";

    for (let i = 1; i <= 250; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            mostrarPokemon(data);
          } else {
            const tipos = data.types.map((tipo) => tipo.type.name);
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })
);
