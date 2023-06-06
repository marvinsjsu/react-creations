/*
  Warnings:

  - Added the required column `createdById` to the `DailyQuote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyQuote" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DailyQuote" ADD CONSTRAINT "DailyQuote_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
