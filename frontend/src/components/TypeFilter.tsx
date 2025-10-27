interface TypeFilterProps {
  selectedTypes: string[];
  onToggle: (type: string) => void;
}

const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export default function TypeFilter({ selectedTypes, onToggle }: TypeFilterProps) {
  return (
    <div className="mb-6">
      <h3 className="font-bold mb-3">Filter by Type</h3>
      <div className="flex flex-wrap gap-2">
        {ALL_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onToggle(type)}
            className={`px-3 py-1 rounded text-sm capitalize transition-colors ${
              selectedTypes.includes(type)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      {selectedTypes.length > 0 && (
        <button
          onClick={() => selectedTypes.forEach(onToggle)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

