import { PrismaClient } from "@prisma/client";
import { Collection } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllCollections = async () => {
  const collections = await prisma.collection.findMany({
    select: {
      name: true,
      nft: {
        select: {
          image: true,
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
          image: true,
          name: true,
          description: true,
          price: true
        }
      }
    }
  })

  return singleCollection
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