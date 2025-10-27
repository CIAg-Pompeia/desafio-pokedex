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

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      onRemoveFavorite(pokemon.id);
    } else {
      onFavorite(pokemon);
    }
  };

  return (
    <div
      onClick={() => onOpenDetail(pokemon)}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
        <button
          onClick={handleFavoriteClick}
          className={`text-2xl ${isFavorite ? 'fill-red-500 text-red-500' : 'hover:fill-red-300'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          ♥
        </button>
      </div>
      
      <div className="text-sm text-gray-600 mb-3">#{pokemon.id.toString().padStart(3, '0')}</div>
      
      {!imageError ? (
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-full h-48 object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-400">No image</span>
        </div>
      )}
      
      <div className="flex gap-2 mt-3 flex-wrap">
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
  );
}

