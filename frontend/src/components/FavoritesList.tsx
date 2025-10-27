import { useState, useEffect } from 'react';
import { getFavorites, updateFavorite, deleteFavorite } from '../services/favoritesApi';
import type { Favorite } from '../types';

interface FavoritesListProps {
  onSelectPokemon: (pokemonId: number) => void;
}

export default function FavoritesList({ onSelectPokemon }: FavoritesListProps) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleEdit = (fav: Favorite) => {
    setEditing(fav.id);
    setNote(fav.note || '');
    setTags([...fav.tags]);
  };

  const handleSave = async (id: string) => {
    await updateFavorite(id, note, tags);
    setEditing(null);
    await loadFavorites();
  };

  const handleCancel = () => {
    setEditing(null);
    setNote('');
    setTags([]);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this favorite?')) {
      await deleteFavorite(id);
      await loadFavorites();
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet. Search and add Pokemon!</p>
      ) : (
        <div className="space-y-4">
          {favorites.map((fav) => (
            <div key={fav.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => onSelectPokemon(fav.pokemonId)}
                  className="text-lg font-bold hover:text-blue-600"
                >
                  Pokemon #{fav.pokemonId}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(fav)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fav.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {editing === fav.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Note</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-3 py-1 border rounded"
                        placeholder="Add tag"
                      />
                      <button onClick={addTag} className="px-3 py-1 bg-blue-500 text-white rounded">
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-200 rounded text-sm flex items-center gap-1">
                          {tag}
                          <button onClick={() => removeTag(tag)} className="text-red-600">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(fav.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {fav.note && (
                    <p className="text-sm text-gray-700 mb-2">{fav.note}</p>
                  )}
                  {fav.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {fav.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

