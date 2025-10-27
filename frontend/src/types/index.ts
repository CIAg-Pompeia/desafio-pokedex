export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export interface Favorite {
  id: string;
  pokemonId: number;
  note?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PokeApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export interface PokemonSearchResult {
  id: number;
  name: string;
  url: string;
}

