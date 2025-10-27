import { useState, useEffect } from 'react';
import { searchPokemon } from './services/pokeApi';
import { addFavorite as addFavApi, getFavorites } from './services/favoritesApi';
import type { Pokemon, Favorite } from './types';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import TypeFilter from './components/TypeFilter';
import FavoritesList from './components/FavoritesList';
import ThemeToggle from './components/ThemeToggle';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [favoriteDetails, setFavoriteDetails] = useState<Favorite[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<Pokemon | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await getFavorites();
      setFavoriteDetails(favs);
      setFavorites(new Set(favs.map(f => f.pokemonId)));
    } catch (error) {
      console.error('Error loading favorites:', error);
      // Set empty favorites if API fails
      setFavoriteDetails([]);
      setFavorites(new Set());
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    const results = await searchPokemon(query);
    setPokemons(results);
    setLoading(false);
  };

  const handleAddFavorite = async (pokemon: Pokemon) => {
    try {
      await addFavApi(pokemon.id);
      await loadFavorites();
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding favorite:', error);
      alert('Failed to add favorite. Make sure the backend is running.');
      throw error;
    }
  };

  const handleRemoveFavorite = async (pokemonId: number) => {
    try {
      const fav = favoriteDetails.find(f => f.pokemonId === pokemonId);
      if (fav) {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/favorites/${fav.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await loadFavorites();
          return Promise.resolve();
        } else {
          alert('Failed to remove favorite.');
          throw new Error('Failed to remove favorite');
        }
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('Failed to remove favorite. Make sure the backend is running.');
      throw error;
    }
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredPokemons = selectedTypes.length === 0
    ? pokemons
    : pokemons.filter(p => p.types.some(t => selectedTypes.includes(t)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Pokédex
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search for Pokemon and manage your favorites
          </p>
        </header>

        <div className="mb-6 flex justify-center items-center gap-4">
          <ThemeToggle />
          <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-4 py-2 rounded ${
                activeTab === 'search'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 rounded ${
                activeTab === 'favorites'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              My Favorites
            </button>
          </div>
        </div>

        {activeTab === 'search' ? (
          <>
            <div className="mb-8 flex justify-center">
              <SearchBar onSearch={handleSearch} />
            </div>

            {pokemons.length > 0 && (
              <div className="mb-6 max-w-6xl mx-auto">
                <TypeFilter selectedTypes={selectedTypes} onToggle={toggleType} />
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Pokemon...</p>
              </div>
            )}

            {!loading && (
              <div className="max-w-7xl mx-auto">
                <PokemonList
                  pokemons={filteredPokemons}
                  favorites={favorites}
                  onFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  onOpenDetail={setSelectedDetail}
                />
              </div>
            )}
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <FavoritesList
              onSelectPokemon={async (pokemonId) => {
                const pokemon = await import('./services/pokeApi').then(m => m.getPokemonById(pokemonId));
                setSelectedDetail(pokemon);
                setActiveTab('search');
              }}
            />
          </div>
        )}

        <PokemonDetail
          pokemon={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
      </div>
    </div>
  );
}

export default App;

