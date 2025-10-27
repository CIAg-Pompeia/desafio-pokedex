-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "note" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Favorite_pokemonId_idx" ON "Favorite"("pokemonId");
