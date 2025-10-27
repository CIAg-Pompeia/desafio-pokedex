import request from 'supertest';
import express from 'express';
import favoritesRoutes from '../favorites';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use('/api/favorites', favoritesRoutes);

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      favorite: {
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    })),
  };
});

describe('Favorites API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/favorites', () => {
    it('should return all favorites', async () => {
      const mockFavorites = [
        { id: '1', pokemonId: 25, note: 'Electric type', tags: ['competitive'], createdAt: new Date(), updatedAt: new Date() },
      ];

      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      (prisma.favorite.findMany as jest.Mock).mockResolvedValue(mockFavorites);

      const response = await request(app).get('/api/favorites');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining(mockFavorites));
    });
  });

  describe('POST /api/favorites', () => {
    it('should create a new favorite', async () => {
      const newFavorite = {
        id: '2',
        pokemonId: 1,
        note: 'Grass starter',
        tags: ['starter'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      (prisma.favorite.create as jest.Mock).mockResolvedValue(newFavorite);

      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonId: 1, note: 'Grass starter', tags: ['starter'] });

      expect(response.status).toBe(201);
      expect(response.body.pokemonId).toBe(1);
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .send({ pokemonId: 'invalid' });

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/favorites/:id', () => {
    it('should update a favorite', async () => {
      const updatedFavorite = {
        id: '1',
        pokemonId: 25,
        note: 'Updated note',
        tags: ['updated'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      (prisma.favorite.update as jest.Mock).mockResolvedValue(updatedFavorite);

      const response = await request(app)
        .put('/api/favorites/1')
        .send({ note: 'Updated note', tags: ['updated'] });

      expect(response.status).toBe(200);
      expect(response.body.note).toBe('Updated note');
    });
  });

  describe('DELETE /api/favorites/:id', () => {
    it('should delete a favorite', async () => {
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      (prisma.favorite.delete as jest.Mock).mockResolvedValue({});

      const response = await request(app).delete('/api/favorites/1');

      expect(response.status).toBe(204);
    });
  });
});

