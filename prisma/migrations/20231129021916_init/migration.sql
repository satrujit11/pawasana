-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Adoption" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "age" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);
