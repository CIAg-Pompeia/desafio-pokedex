import type { Pokemon } from '../types';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemons: Pokemon[];
  favorites: Set<number>;
  onFavorite: (pokemon: Pokemon) => void;
  onRemoveFavorite: (pokemonId: number) => void;
  onOpenDetail: (pokemon: Pokemon) => void;
}

export default function PokemonList({
  pokemons,
  favorites,
  onFavorite,
  onRemoveFavorite,
  onOpenDetail,
}: PokemonListProps) {
  if (pokemons.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No Pokemon found</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm">Try searching for a Pokemon by name or ID!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favorites.has(pokemon.id)}
          onFavorite={onFavorite}
          onRemoveFavorite={onRemoveFavorite}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
}

