import { PrismaClient } from "@prisma/client";
import { NftImage } from "./nft-image.types";
import { Nft } from "../nft/nft.types";

const prisma = new PrismaClient()
export const getAllNftImage = async () => {
  const nftImage = await prisma.nftImage.findMany({
    include:{
      imageForNft:{
        select: {
          nftImage: {
            select: {
              url: true
            }
          }
        }
      }
    }
  }) 
  return nftImage
}
export const getSigleNftImage = async (id:string) => {
  const nftImage = await prisma.nftImage.findUnique({
    where:{
      id
    }
  }) 
  return nftImage
}

export const createNftImage = async (data: NftImage ) => {
  const nftImage = await prisma.nftImage.create({
    data: {...data}
  });
    
  return nftImage
}

export const deleteNftImage = async (id: string ) => {
  const nftImage = await prisma.nftImage.deleteMany({
    where: {
      id
    },
  });
  return nftImage
}