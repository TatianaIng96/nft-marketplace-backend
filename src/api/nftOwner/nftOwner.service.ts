import { PrismaClient } from "@prisma/client";
import { NftOwnerRelation, NftOwner } from "./nftOwner.types";

const prisma = new PrismaClient();

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
  });

  return nftOwners;
};

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
          id:true,
          firstName: true,
          lastName: true,
          profileImage:true,
        }
      },
    }
  });

  return owner;
};

export const createNftOwner = async (inputData: NftOwnerRelation) => {
  const createNftOwner = await prisma.nftOwner.create({
    data: { ...inputData }
  });

  return createNftOwner;
};

export const updateNftOwner = async (id: string, inputData: NftOwner) => {
  const updateSingleNftOwner = await prisma.nftOwner.update({
    where: { id },
    data: { ...inputData }
  });

  return updateSingleNftOwner;
}
