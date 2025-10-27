import axios from 'axios';
import type { Pokemon, PokeApiResponse, PokemonSearchResult } from '../types';

const POKE_API_BASE = 'https://pokeapi.co/api/v2';
const TOTAL_POKEMON = 1025; // Current generation count

// Cache for Pokemon list
let pokemonListCache: PokemonSearchResult[] | null = null;

const getAllPokemon = async (): Promise<PokemonSearchResult[]> => {
  if (pokemonListCache) return pokemonListCache;
  
  try {
    const response = await axios.get(`${POKE_API_BASE}/pokemon?limit=${TOTAL_POKEMON}`);
    pokemonListCache = response.data.results.map((p: any) => ({
      id: parseInt(p.url.split('/').slice(-2, -1)[0]),
      name: p.name,
      url: p.url,
    }));
    return pokemonListCache!;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    return [];
  }
};

export const searchPokemon = async (query: string): Promise<Pokemon[]> => {
  try {
    const lowerQuery = query.toLowerCase().trim();
    
    // Try to search by ID first
    if (!isNaN(Number(query))) {
      const pokemon = await getPokemonById(Number(query));
      return [pokemon];
    }
    
    // Search by partial name match
    const allPokemon = await getAllPokemon();
    const matchingPokemon = allPokemon.filter(p => 
      p.name.toLowerCase().includes(lowerQuery)
    );
    
    if (matchingPokemon.length === 0) {
      return [];
    }
    
    // Fetch details for matching Pokemon (limit to first 20 for performance)
    const pokemonToFetch = matchingPokemon.slice(0, 20);
    const pokemonDetails = await Promise.all(
      pokemonToFetch.map(p => getPokemonById(p.id))
    );
    
    return pokemonDetails;
  } catch (error) {
    console.error('Error searching Pokemon:', error);
    return [];
  }
};

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await axios.get<PokeApiResponse>(`${POKE_API_BASE}/pokemon/${id}`);
  return transformPokemonResponse(response.data);
};

const transformPokemonResponse = (data: PokeApiResponse): Pokemon => {
  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    abilities: data.abilities.map(a => a.ability.name),
    stats: {
      hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
      attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
      defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
      specialAttack: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
      specialDefense: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
      speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
    },
  };
};
