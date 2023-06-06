/*
  Warnings:

  - You are about to drop the `JournalPrompt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "JournalPrompt";

-- CreateTable
CREATE TABLE "DailyQuote" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "by" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyQuote_pkey" PRIMARY KEY ("id")
);
