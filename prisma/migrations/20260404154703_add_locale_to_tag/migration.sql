/*
  Warnings:

  - You are about to drop the column `slug` on the `Tag` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Tag_slug_idx";

-- DropIndex
DROP INDEX "Tag_slug_key";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "slug",
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';

-- CreateIndex
CREATE INDEX "Tag_locale_idx" ON "Tag"("locale");
