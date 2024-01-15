

// //...................




// import { getPokemonByName, Pokemon, getPokemonById } from "./app.ts";
// import "./style.css";

// const appHtml = document.getElementById("app");

// if (appHtml) {
//   const ulElement = document.createElement("ul");
//   appHtml.appendChild(ulElement);

//   let currentPage = 1;
//   const itemsPerPage = 10;

//   async function displayPokemon(id: number) {
//     const pokemon: Pokemon = await getPokemonById(id);
//     const liText = document.createElement("li");
//     liText.classList.add("pokemon");
//     liText.textContent = `Name: ${pokemon.name}`;
//     liText.addEventListener("click", async () => {
//       const detailedPokemon = await getPokemonById(pokemon.id);
//       displayPokemonDetails(detailedPokemon);
//     });

//     const imgElement = document.createElement("img");
//     imgElement.src = pokemon.image;
//     liText.appendChild(imgElement);

//     ulElement.appendChild(liText);
//   }

//   function displayPokemonDetails(pokemon: Pokemon) {
//     const detailsElement = document.createElement("div");
//     detailsElement.textContent = `Type: ${pokemon.type}\nName: ${pokemon.name}\nImage: ${pokemon.image}`;
//     const imgElement = document.createElement("img");
//     imgElement.src = pokemon.image;
//     detailsElement.appendChild(imgElement);
//     if (appHtml) {
//       appHtml.innerHTML = "";
//       appHtml?.appendChild(detailsElement);
//     }
//   }

//   async function displayPage(page: number) {
//     ulElement.innerHTML = "";
//     for (
//       let id = (page - 1) * itemsPerPage + 1;
//       id <= page * itemsPerPage;
//       id++
//     ) {
//       await displayPokemon(id);
//     }
//   }

//   const prevButton = document.createElement("button");
//   prevButton.textContent = "Previous";
//   prevButton.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       displayPage(currentPage);
//     }
//   });
//   appHtml.appendChild(prevButton);

//   const nextButton = document.createElement("button");
//   nextButton.textContent = "Next";
//   nextButton.addEventListener("click", () => {
//     currentPage++;
//     displayPage(currentPage);
//   });
//   appHtml.appendChild(nextButton);

//   async function searchPokemonByType(type: string) {
//     try {
//       ulElement.innerHTML = ""; // Effacer le contenu actuel

//       // Effectuer la recherche en utilisant l'API
//       const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

//       if (!response.ok) {
//         throw new Error(`Erreur lors de la recherche des Pokémon de type ${type}`);
//       }

//       const typeData = await response.json();

//       if (!typeData) {
//         // Afficher un message si les données du type ne sont pas trouvées
//         ulElement.innerHTML = "<p>Type de Pokémon not found. Veuillez réessayer.</p>";
//       } else {
//         // Afficher les Pokémon du type sélectionné
//         const pokemonIds = typeData.pokemon.map((entry: any) => entry.pokemon.url.split("/")[6]);

//         for (const id of pokemonIds) {
//           await displayPokemon(Number(id));
//         }
//       }
//     } catch (error) {
//       // Gérer les erreurs lors de la recherche des Pokémon par type
//       console.error(`Erreur lors de la recherche des Pokémon de type ${type}:`, error);
//       // Afficher un message d'erreur à l'utilisateur si nécessaire
//       ulElement.innerHTML = "<p><strong>Une erreur s'est produite lors de la recherche.</strong></p>";
//     }
//   }

//   // Fetch and display types
//   async function getPokemonTypes(): Promise<string[]> {
//     const response = await fetch("https://pokeapi.co/api/v2/type");
//     const data = await response.json();
//     return data.results.map((type: any) => type.name);
//   }

//   getPokemonTypes().then((types) => {
//     const typeSelect = document.getElementById("type-select") as HTMLSelectElement;

//     // Populate type options
//     types.forEach((type) => {
//       const option = document.createElement("option");
//       option.value = type;
//       option.textContent = type;
//       typeSelect.appendChild(option);
//     });

//     typeSelect.value = "";

//     // Add event listener to type select element
//     typeSelect.addEventListener("change", () => {
//       const selectedType = typeSelect.value;
//       if (selectedType) {
//         searchPokemonByType(selectedType);
//       }
//     });
//   });

//   displayPage(currentPage);
// }

import { Pokemon, getPokemonById, getPokemonByName } from './app.ts';

const appHtml = document.getElementById("app");

if (appHtml) {
  const ulElement = document.createElement("ul");
  appHtml.appendChild(ulElement);

  let currentPage = 1;
  const itemsPerPage = 10;

  async function displayPokemon(id: number) {
    const pokemon: Pokemon = await getPokemonById(id);
    const liText = document.createElement("li");
    liText.classList.add("pokemon");
    liText.textContent = `Name: ${pokemon.name}`;
    liText.addEventListener("click", () => {
      displayPokemonDetails(pokemon);
    });

    const imgElement = document.createElement("img");
    imgElement.src = pokemon.image;
    liText.appendChild(imgElement);

    ulElement.appendChild(liText);
  }

  function displayPokemonDetails(pokemon: Pokemon) {
    const detailsElement = document.createElement("div");
    detailsElement.textContent = `Type: ${pokemon.type}\nName: ${pokemon.name}\nImage:  `;
    const imgElement = document.createElement("img");
    imgElement.src = pokemon.image;
    detailsElement.appendChild(imgElement);
    appHtml.innerHTML = "";
    appHtml.appendChild(detailsElement);
  }

  async function displayPage(page: number) {
    ulElement.innerHTML = "";
    for (
      let id = (page - 1) * itemsPerPage + 1;
      id <= page * itemsPerPage;
      id++
    ) {
      await displayPokemon(id);
    }
  }

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  });
  appHtml.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", () => {
    currentPage++;
    displayPage(currentPage);
  });
  appHtml.appendChild(nextButton);

  async function searchPokemon() {
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    const searchType = document.querySelector(
      "input[name='searchType']:checked"
    ) as HTMLInputElement;
    if (searchInput && searchType) {
      const searchTerm = searchInput.value;
      let pokemon: Pokemon;
      if (searchType.value === "name") {
        pokemon = await getPokemonByName(searchTerm);
      } else {
        pokemon = await getPokemonById(Number(searchTerm));
      }
      displayPokemonDetails(pokemon);
    }
  }

  const searchButton = document.getElementById("searchButton");
  if (searchButton) {
    searchButton.addEventListener("click", searchPokemon);
  }

  async function getPokemonTypes(): Promise<string[]> {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    const data = await response.json();
    return data.results.map((type: any) => type.name);
  }

  getPokemonTypes().then((types) => {
    const typeSelect = document.getElementById(
      "type-select"
    ) as HTMLSelectElement;
    types.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      typeSelect.appendChild(option);
    });
  });

  const typeSelect = document.getElementById(
    "type-select"
  ) as HTMLSelectElement;
  typeSelect.addEventListener("change", async () => {
    const selectedType = typeSelect.value;
    const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
    const data = await response.json();
    const pokemonIds = data.pokemon.map((entry: any) => entry.pokemon.url.split("/")[6]);
    ulElement.innerHTML = "";
    for (const id of pokemonIds) {
      await displayPokemon(Number(id));
    }
  });

  displayPage(currentPage);
}
