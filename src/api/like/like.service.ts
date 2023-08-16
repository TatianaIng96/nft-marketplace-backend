import { Request, Response} from 'express';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getAllLike = async () => {
  const like = await prisma.like.findMany({
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

export const createLike = async (nftId: string, userId: string) => {
  const like = await prisma.like.create({
    data: {
      nftId,
      userId
    },
  });
}
