import { PrismaClient } from "@prisma/client";
import { Collection } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllCollections = async () => {
  const collections = await prisma.collection.findMany({
    select: {
      name: true,
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
          name: true,
          description: true,
          price: true
        }
      }
    }
  })

  return collections
}

export const getCollectionById = async (id: number) => {
  const singleCollection = await prisma.collection.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
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
          name: true,
          description: true,
          price: true
        }
      }
    }
  })

  return singleCollection
}

export const getCollectionByName = async (name: string) => {
  const collection = await prisma.collection.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
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
          name: true,
          description: true,
          price: true
        }
      },
      createdAt: false,
      updateAt: false
    }
  });

  return collection;
}

export const updateCollection = async (id: number, input: Collection) => {
  const collectionUpdated = await prisma.collection.update({
    where: { id },
    data: { ...input }
  })

  return collectionUpdated
}

export const createCollection = async (input: Collection) => {
  const newCollection = await prisma.collection.create({
    data: { ...input }
  })

  return newCollection
}

export const deleteCollection = async (id: number) => {
  const deleteSingleCollection = await prisma.collection.delete({
    where: { id }
  })

  return deleteSingleCollection
}