/*
  Warnings:

  - You are about to alter the column `pincode` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "pincode" SET DATA TYPE INTEGER;
