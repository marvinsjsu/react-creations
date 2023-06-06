/*
  Warnings:

  - Added the required column `firstName` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "firstName" TEXT NOT NULL;
