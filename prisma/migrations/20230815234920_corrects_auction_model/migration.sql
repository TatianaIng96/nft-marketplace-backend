/*
  Warnings:

  - The primary key for the `Auction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ownerId` on the `Auction` table. All the data in the column will be lost.
  - The `id` column on the `Auction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `auctionId` on the `Bid` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_auctionId_fkey";

-- AlterTable
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_pkey",
DROP COLUMN "ownerId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Auction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "auctionId",
ADD COLUMN     "auctionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_nftOwnerId_fkey" FOREIGN KEY ("nftOwnerId") REFERENCES "NftOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
