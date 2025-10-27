interface TypeFilterProps {
  selectedTypes: string[];
  onToggle: (type: string) => void;
}

const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    electric: 'bg-electric',
    fire: 'bg-fire',
    water: 'bg-water',
    grass: 'bg-grass',
    poison: 'bg-poison',
    flying: 'bg-flying',
    bug: 'bg-bug',
    ground: 'bg-ground',
    fairy: 'bg-fairy',
    fighting: 'bg-fighting',
    psychic: 'bg-psychic',
    rock: 'bg-rock',
    steel: 'bg-steel',
    ice: 'bg-ice',
    ghost: 'bg-ghost',
    dragon: 'bg-dragon',
    dark: 'bg-dark',
  };
  return colors[type] || 'bg-normal';
};

export default function TypeFilter({ selectedTypes, onToggle }: TypeFilterProps) {
  const handleClearFilters = () => {
    selectedTypes.forEach(type => onToggle(type));
  };

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Filter by Type</h3>
      <div className="flex flex-wrap gap-2">
        {ALL_TYPES.map((type) => {
          const isSelected = selectedTypes.includes(type);
          const typeColorClass = getTypeColor(type);
          return (
            <button
              key={type}
              onClick={() => onToggle(type)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                isSelected
                  ? `${typeColorClass} text-white shadow-md scale-105`
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
      {selectedTypes.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Clear all filters ({selectedTypes.length} active)
          </button>
        </div>
      )}
    </div>
  );
}

