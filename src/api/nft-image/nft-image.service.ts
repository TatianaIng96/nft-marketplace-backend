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
    take: 3, // Obtener solo los 3 últimos registros
    orderBy: {
      createdAt: 'desc', // Ordenar por fecha de creación en orden descendente (los más recientes primero)
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

export const createNftImage = async (inputData: NftImage) => {
  const nftImage = await prisma.nftImage.create({
    data: {
      ...inputData,
    }
  });

  return nftImage;
}

export const deleteNftImage = async (id: string) => {
  const nftImage = await prisma.nftImage.deleteMany({
    where: {
      id
    },
  });
  return nftImage;
}