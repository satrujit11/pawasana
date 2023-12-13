/*
  Warnings:

  - You are about to drop the column `spreadSheetLink` on the `Event` table. All the data in the column will be lost.
  - Added the required column `spreadSheetId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "spreadSheetLink",
ADD COLUMN     "spreadSheetId" TEXT NOT NULL;
