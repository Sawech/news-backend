/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `Article` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Article_status_publishedAt_idx";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "publishedAt",
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';

-- AlterTable
ALTER TABLE "Opinion" ADD COLUMN     "subject" TEXT;

-- CreateIndex
CREATE INDEX "Article_status_idx" ON "Article"("status");

-- CreateIndex
CREATE INDEX "Article_locale_idx" ON "Article"("locale");
