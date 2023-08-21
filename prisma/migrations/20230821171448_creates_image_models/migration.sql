/*
  Warnings:

  - You are about to drop the column `status` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Nft` table. All the data in the column will be lost.
  - You are about to drop the column `property` on the `Nft` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Nft` table. All the data in the column will be lost.
  - You are about to drop the column `adquisitionDate` on the `NftOwner` table. All the data in the column will be lost.
  - You are about to drop the column `isCharged` on the `NftOwner` table. All the data in the column will be lost.
  - You are about to drop the column `sellDate` on the `NftOwner` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `buyerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `User` table. All the data in the column will be lost.
  - Added the required column `nftOwnerId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "image",
DROP COLUMN "property",
DROP COLUMN "size",
ALTER COLUMN "onSale" SET DEFAULT false;

-- AlterTable
ALTER TABLE "NftOwner" DROP COLUMN "adquisitionDate",
DROP COLUMN "isCharged",
DROP COLUMN "sellDate";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "sellerId",
ADD COLUMN     "nftOwnerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "buyerId",
DROP COLUMN "cover",
DROP COLUMN "image",
DROP COLUMN "sellerId";

-- CreateTable
CREATE TABLE "NftImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NftImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageForNft" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "nftImageId" TEXT NOT NULL,

    CONSTRAINT "ImageForNft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoverImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageForNft" ADD CONSTRAINT "ImageForNft_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "Nft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageForNft" ADD CONSTRAINT "ImageForNft_nftImageId_fkey" FOREIGN KEY ("nftImageId") REFERENCES "NftImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileImage" ADD CONSTRAINT "ProfileImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverImage" ADD CONSTRAINT "CoverImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_nftOwnerId_fkey" FOREIGN KEY ("nftOwnerId") REFERENCES "NftOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
