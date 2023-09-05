/*
  Warnings:

  - A unique constraint covering the columns `[validateToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_validateToken_key" ON "User"("validateToken");
