/*
  Warnings:

  - Added the required column `state` to the `Adoption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adoption" ADD COLUMN     "state" TEXT NOT NULL;
