/*
  Warnings:

  - Made the column `isActive` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isActive" SET NOT NULL;
