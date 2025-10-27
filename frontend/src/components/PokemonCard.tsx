import { useState } from 'react';
import type { Pokemon } from '../types';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onFavorite: (pokemon: Pokemon) => void;
  onRemoveFavorite: (pokemonId: number) => void;
  onOpenDetail: (pokemon: Pokemon) => void;
}

export default function PokemonCard({
  pokemon,
  isFavorite,
  onFavorite,
  onRemoveFavorite,
  onOpenDetail,
}: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      if (isFavorite) {
        await onRemoveFavorite(pokemon.id);
      } else {
        await onFavorite(pokemon);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => onOpenDetail(pokemon)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold capitalize text-gray-900 dark:text-white">{pokemon.name}</h3>
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className={`text-3xl transition-all duration-300 disabled:opacity-50 ${
              isLoading 
                ? 'animate-pulse' 
                : isFavorite 
                  ? 'text-red-500 fill-red-500 hover:scale-110' 
                  : 'text-gray-400 hover:text-red-400 hover:scale-110'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isLoading ? '⏳' : '❤️'}
          </button>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">#{pokemon.id.toString().padStart(3, '0')}</div>
        
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3">
          {!imageError ? (
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-full h-48 object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 flex-wrap">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 rounded text-xs text-white capitalize ${
              type === 'electric' ? 'bg-electric' :
              type === 'fire' ? 'bg-fire' :
              type === 'water' ? 'bg-water' :
              type === 'grass' ? 'bg-grass' :
              type === 'poison' ? 'bg-poison' :
              type === 'flying' ? 'bg-flying' :
              type === 'bug' ? 'bg-bug' :
              type === 'ground' ? 'bg-ground' :
              type === 'fairy' ? 'bg-fairy' :
              type === 'fighting' ? 'bg-fighting' :
              type === 'psychic' ? 'bg-psychic' :
              type === 'rock' ? 'bg-rock' :
              type === 'steel' ? 'bg-steel' :
              type === 'ice' ? 'bg-ice' :
              type === 'ghost' ? 'bg-ghost' :
              type === 'dragon' ? 'bg-dragon' :
              type === 'dark' ? 'bg-dark' :
              'bg-normal'
            }`}
          >
            {type}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}

