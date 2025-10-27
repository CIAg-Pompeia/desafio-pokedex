import axios from 'axios';
import type { Favorite } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export const getFavorites = async (): Promise<Favorite[]> => {
  const response = await api.get('/favorites');
  return response.data;
};

export const addFavorite = async (pokemonId: number, note?: string, tags: string[] = []): Promise<Favorite> => {
  const response = await api.post('/favorites', { pokemonId, note, tags });
  return response.data;
};

export const updateFavorite = async (id: string, note?: string, tags?: string[]): Promise<Favorite> => {
  const response = await api.put(`/favorites/${id}`, { note, tags });
  return response.data;
};

export const deleteFavorite = async (id: string): Promise<void> => {
  await api.delete(`/favorites/${id}`);
};

