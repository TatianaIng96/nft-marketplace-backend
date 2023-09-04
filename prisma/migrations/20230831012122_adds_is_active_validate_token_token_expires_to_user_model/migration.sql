/*
  Warnings:

  - A unique constraint covering the columns `[validateToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN DEFAULT false,
ADD COLUMN     "tokenExpires" TIMESTAMP(3),
ADD COLUMN     "validateToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_validateToken_key" ON "User"("validateToken");
