export interface Pokemon {
  id: number;
  name: string;
  type: string;
  image: string;
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  const pokemon: Pokemon = {
    name: data.name,
    id: data.id,
    type: data.types[0].type.name,
    image: data.sprites.other["official-artwork"].front_shiny,
  };

  return pokemon;
}

//------------------------------------------------------------
export async function getPokemonByName(name: string): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();

  const pokemon: Pokemon = {
    name: data.name,
    id: data.id,
    type: data.types[0].type.name,
    image: data.sprites.other["official-artwork"].front_shiny,
  };

  return pokemon;
}
