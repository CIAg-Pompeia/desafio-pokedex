# Pokédex - Full-Stack Application

A modern Pokédex application that allows you to search for Pokémon, view detailed information, and manage your favorite Pokémon with notes and tags.

## Features

- 🔍 **Search Pokémon**: Search by name or ID (e.g., "pikachu" or "25")
- 📊 **Detailed Stats**: View Pokémon details including types, abilities, and base stats
- ⭐ **Favorites Management**: Save your favorite Pokémon with custom notes and tags
- 🎨 **Type Filtering**: Filter Pokémon by type (electric, fire, water, grass, etc.)
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Vitest** - Testing framework

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM for database
- **PostgreSQL** - Database
- **Jest** - Testing framework

### External API
- **PokeAPI** - Pokémon data (https://pokeapi.co/)

## Project Structure

```
pokedex/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── services/    # API service layer
│   │   ├── types/       # TypeScript type definitions
│   │   └── main.tsx     # Entry point
│   └── package.json
├── backend/           # Express backend API
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── prisma/      # Database schema
│   │   └── server.ts    # Server entry point
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd pokedex
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

### 3. Configure the Database

Create a PostgreSQL database:

```bash
createdb pokedex
```

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/pokedex"
PORT=3001
```

Generate Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Set up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3001
```

## Running the Application

### Development Mode

In separate terminal windows:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001`.

### Production Mode

Build and start:

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
npm test
```

## API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### GET /api/favorites
Get all favorite Pokémon.

**Response:**
```json
[
  {
    "id": "uuid",
    "pokemonId": 25,
    "note": "Favorite electric type",
    "tags": ["electric", "competitive"],
    "createdAt": "2025-10-27T12:00:00Z",
    "updatedAt": "2025-10-27T12:00:00Z"
  }
]
```

#### POST /api/favorites
Add a Pokémon to favorites.

**Request Body:**
```json
{
  "pokemonId": 25,
  "note": "Favorite electric type",
  "tags": ["electric", "competitive"]
}
```

#### PUT /api/favorites/:id
Update a favorite Pokémon's note or tags.

**Request Body:**
```json
{
  "note": "Updated note",
  "tags": ["updated", "tags"]
}
```

#### DELETE /api/favorites/:id
Remove a Pokémon from favorites.

## Usage

1. **Search for Pokémon**: Enter a Pokémon name or ID in the search bar
2. **View Details**: Click on any Pokémon card to see detailed information
3. **Add to Favorites**: Click the heart icon on a Pokémon card
4. **Manage Favorites**: Go to the "My Favorites" tab to edit notes and tags or remove favorites
5. **Filter by Type**: Use the type filter buttons to show only Pokémon of specific types
6. **Toggle Theme**: Click the moon/sun icon to switch between light and dark mode

## Features Implementation

### Core Requirements
- ✅ Search Pokémon by name or ID
- ✅ Display Pokémon with sprites, types, abilities, and stats
- ✅ CRUD operations for favorites
- ✅ Local persistence (PostgreSQL database)
- ✅ Type filtering

### Extra Features
- ✅ Backend with PostgreSQL database
- ✅ Dark/light mode toggle
- ✅ Responsive design
- ✅ Loading states
- ✅ Smooth animations
- ✅ Comprehensive test coverage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokémon data
- Pokemon Company for the original Pokémon designs

