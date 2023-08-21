import { PrismaClient } from "@prisma/client";
import { NftOwnerRelation } from "./nft_owner.types";

const prisma = new PrismaClient()

export const getAllNftOwners = async () => {
  const nftOwners = await prisma.nftOwner.findMany({
    select: {
      nft: {
        select: {
          imageForNft: {
            select: {
              nftImage: {
                select: {
                  url: true
                }
              }
            }
          },
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
          imageForNft: {
            select: {
              nftImage: {
                select: {
                  url: true
                }
              }
            }
          },
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
    }
  })
}

export const createNftOwner = async (input: NftOwnerRelation) => {
  const createNftOwner = prisma.nftOwner.create({
    data: { ...input }
  })

  return createNftOwner
}