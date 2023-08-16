import { PrismaClient } from "@prisma/client";
import { Like } from './like.types'

const prisma = new PrismaClient()

export const getByLike = async (id:string) => {
  const like = await prisma.like.findMany({
    where: {
      nftId: id
    },
    include:{
      user: {
        select: {
          firstName: true,
          lastName: true,
        }
      },
      nft: {
        select: {
          name: true
        }
      }
    }
  }) 
  return like
}

export const createLike = async (data: Like ) => {
  const like = await prisma.like.create({
    data: {...data}
  });
    
  return like
}

export const deleteLike = async (data: Like ) => {
  const Like = await prisma.like.deleteMany({
    where: {
      nftId: data.nftId,
      userId: data.userId
    },
  });
  return Like
}