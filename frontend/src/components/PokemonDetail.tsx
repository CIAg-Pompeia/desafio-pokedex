import type { Pokemon } from '../types';

interface PokemonDetailProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

export default function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-64 h-64 mx-auto object-contain"
            />
            <p className="text-gray-600 mt-2">#{pokemon.id.toString().padStart(3, '0')}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Types</h3>
            <div className="flex gap-2 flex-wrap">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`px-3 py-1 rounded text-sm text-white capitalize ${
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

          <div className="mb-6">
            <h3 className="font-bold mb-2">Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability}
                  className="px-3 py-1 bg-gray-100 rounded text-sm capitalize"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Base Stats</h3>
            <div className="space-y-2">
              <StatBar label="HP" value={pokemon.stats.hp} max={100} />
              <StatBar label="Attack" value={pokemon.stats.attack} max={100} />
              <StatBar label="Defense" value={pokemon.stats.defense} max={100} />
              <StatBar label="Sp. Atk" value={pokemon.stats.specialAttack} max={100} />
              <StatBar label="Sp. Def" value={pokemon.stats.specialDefense} max={100} />
              <StatBar label="Speed" value={pokemon.stats.speed} max={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = (value / max) * 100;
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-600">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

