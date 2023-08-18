import { PrismaClient } from "@prisma/client";

import { Nft } from "./nft.types";

const prisma = new PrismaClient()

export const getAllNft = async () => {
    const nft = await prisma.nft.findMany({
        include:{
            like:{
                select:{
                    id:true
                }
            },
            auction:{
                select:{
                    id:true
                }
            }
        }
    })
    return nft
}

export const getNftById =async (id: string) => {
    const nft = await prisma.nft.findUnique({
        where:{
            id,
        }
    })
     return nft
}

export const createNft = async (input: Nft) => {
    const nft = await prisma.nft.create({
        data: {...input}
    })

    return nft
}

export const updateNFT =async (input: Nft, id:string) => {
    const nft = await prisma.nft.update({
        where: {
            id
        },
        data: {...input}
    })

    return nft
}

export const deleteNft = async(id: string) => {
    
    const nft = await prisma.nft.delete({
      where: {
        id,
      },
    });
  
    return nft;
  }