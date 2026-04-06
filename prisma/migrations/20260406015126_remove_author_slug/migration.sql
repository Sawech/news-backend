/*
  Warnings:

  - You are about to drop the column `slug` on the `Author` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Author_slug_idx";

-- DropIndex
DROP INDEX "Author_slug_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "slug";
