/*
  Warnings:

  - You are about to drop the `NewsletterSubscriber` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';

-- AlterTable
ALTER TABLE "Opinion" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';

-- AlterTable
ALTER TABLE "Ticker" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en';

-- DropTable
DROP TABLE "NewsletterSubscriber";

-- CreateIndex
CREATE INDEX "Category_locale_idx" ON "Category"("locale");

-- CreateIndex
CREATE INDEX "Opinion_locale_idx" ON "Opinion"("locale");

-- CreateIndex
CREATE INDEX "Ticker_locale_idx" ON "Ticker"("locale");
