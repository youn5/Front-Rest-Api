import { getPokemonByName, Pokemon, getPokemonById } from "./app.ts";
import "./style.css";
const appHtml = document.getElementById("app");

if (appHtml) {
  const ulElement = document.createElement("ul");
  appHtml.appendChild(ulElement);

  let currentPage = 1;
  const itemsPerPage = 10;

  async function displayPokemon(id: number) {
    const pokemon: Pokemon = await getPokemonById(id);
    const liText = document.createElement("li");
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
    // appHtml.innerHTML = "";
    // appHtml.appendChild(detailsElement);
    appHtml && (appHtml.innerHTML = "");
    appHtml?.appendChild(detailsElement);
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
  typeSelect.addEventListener("change", () => {
    console.log("changed");
    const selectedType = typeSelect.value;
    const pokemonCards = document.querySelectorAll(".pokemon");
    pokemonCards.forEach((card) => {
       
      const typeElement = card.querySelector(".type span");
      if (typeElement === null) {
        throw new Error("typeElement not found in the card");
      }
      if (!(card instanceof HTMLDivElement)) {
        throw new Error("card is not a div");
      }
      const cardType = typeElement.textContent || "";
      if (selectedType === "" || selectedType === cardType.toLowerCase()) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  displayPage(currentPage);
}
