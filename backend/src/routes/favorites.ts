import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

const favoriteSchema = z.object({
  pokemonId: z.number(),
  note: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

const updateFavoriteSchema = z.object({
  note: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// GET /api/favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// POST /api/favorites
router.post('/', async (req, res) => {
  try {
    const body = favoriteSchema.parse(req.body);
    
    const favorite = await prisma.favorite.create({
      data: body,
    });
    
    res.status(201).json(favorite);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error creating favorite:', error);
    res.status(500).json({ error: 'Failed to create favorite' });
  }
});

// PUT /api/favorites/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = updateFavoriteSchema.parse(req.body);
    
    const favorite = await prisma.favorite.update({
      where: { id },
      data: body,
    });
    
    res.json(favorite);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error updating favorite:', error);
    res.status(500).json({ error: 'Failed to update favorite' });
  }
});

// DELETE /api/favorites/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.favorite.delete({
      where: { id },
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

export default router;

