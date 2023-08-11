/*
  Warnings:

  - You are about to drop the column `date` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `nftId` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `end_auction` on the `Nft` table. All the data in the column will be lost.
  - You are about to drop the column `on_sale` on the `Nft` table. All the data in the column will be lost.
  - You are about to drop the column `adquisition_date` on the `NftOwner` table. All the data in the column will be lost.
  - You are about to drop the column `sell_date` on the `NftOwner` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Buyer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seller` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `auctionId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `onSale` to the `Nft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `royalty` to the `Nft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Nft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `NftOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - The required column `buyerId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `sellerId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_nftId_fkey";

-- DropForeignKey
ALTER TABLE "Buyer" DROP CONSTRAINT "Buyer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_sellerId_fkey";

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "date",
DROP COLUMN "nftId",
ADD COLUMN     "auctionId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "end_auction",
DROP COLUMN "on_sale",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "onSale" BOOLEAN NOT NULL,
ADD COLUMN     "royalty" INTEGER NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "NftOwner" DROP COLUMN "adquisition_date",
DROP COLUMN "sell_date",
ADD COLUMN     "adquisitionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isCharged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isCurrentOwner" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sellDate" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "buyerId" TEXT NOT NULL,
ADD COLUMN     "cover" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Buyer";

-- DropTable
DROP TABLE "Seller";

-- CreateTable
CREATE TABLE "Auction" (
    "id" SERIAL NOT NULL,
    "finishDate" TIMESTAMP(3) NOT NULL,
    "minAmount" INTEGER NOT NULL,
    "nftId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "Nft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "NftOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
