import axios from 'axios';
import type { Pokemon, PokeApiResponse } from '../types';

const POKE_API_BASE = 'https://pokeapi.co/api/v2';

export const searchPokemon = async (query: string): Promise<Pokemon[]> => {
  try {
    // Try to search by ID first
    if (!isNaN(Number(query))) {
      const pokemon = await getPokemonById(Number(query));
      return [pokemon];
    }
    
    // Search by name
    const response = await axios.get(`${POKE_API_BASE}/pokemon/${query.toLowerCase()}`);
    const pokemon = transformPokemonResponse(response.data as PokeApiResponse);
    return [pokemon];
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
