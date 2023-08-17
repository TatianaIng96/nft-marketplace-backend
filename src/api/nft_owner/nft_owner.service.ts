import { PrismaClient } from "@prisma/client";
import { NftOwner } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllNftOwners = async () => {
  const nftOwners = await prisma.nftOwner.findMany({
    select: {
      nft: {
        select: {
          image: true,
          name: true
        }
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      },
      adquisitionDate: true,
    },
  })
  return nftOwners
}

export const getNftOwnerById = async (id: string) => {
  const owner = await prisma.nftOwner.findUnique({
    where: {
      id
    },
    select: {
      nft: {
        select: {
          image: true,
          name: true
        }
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      },
      adquisitionDate: true
    }
  })
}

export const createNftOwner = async (input: NftOwner) => {
  const createNftOwner = prisma.nftOwner.create({
    data: { ...input }
  })

  return createNftOwner
}