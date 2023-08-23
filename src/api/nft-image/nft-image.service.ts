import { PrismaClient } from "@prisma/client";
import { NftImage, NftImageWithName } from "./nft-image.types";
import { Nft } from "../nft/nft.types";

const prisma = new PrismaClient()

export const getAllNftImage = async () => {
  const nftImage = await prisma.nftImage.findMany({
    include: {
      imageForNft: {
        select: {
          nftImage: {
            select: {
              url: true
            }
          }
        }
      }
    }
  });
  return nftImage;
}

export const getLast3Images = async () => {
  const nftImage = await prisma.nftImage.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      imageForNft: {
        select: {
          nftImage: {
            select: {
              url: true
            }
          }
        }
      }
    }
  });
  return nftImage;
}

export const getSingleNftImage = async (id: string) => {
  const nftImage = await prisma.nftImage.findUnique({
    where: {
      id
    }
  });
  return nftImage;
}

export const createNftImage = async (inputData: any) => {
  const { url_1, url_2, url_3 } = inputData;
  const nftImage_1 = await prisma.nftImage.create({
    data: {
      url: url_1,
    }
  });
  const nftImage_2 = await prisma.nftImage.create({
    data: {
      url: url_2,
    }
  });
  const nftImage_3 = await prisma.nftImage.create({
    data: {
      url: url_3,
    }
  });

  return [nftImage_1, nftImage_2, nftImage_3];
}

export const deleteNftImage = async (id: string) => {
  const nftImage = await prisma.nftImage.deleteMany({
    where: {
      id
    },
  });
  return nftImage;
}