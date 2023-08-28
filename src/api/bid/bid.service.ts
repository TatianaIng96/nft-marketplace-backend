import { PrismaClient } from "@prisma/client";
import { Bid } from './bid.types';
import { Nft } from '../nft/nft.types';

const prisma = new PrismaClient()

export const getAllBid = async (id: number) => {
  const bid = await prisma.bid.findMany({
    where: {
      auctionId: id
    },
    select: {
      id:true,
      amount: true,
      createdAt: true,
      user: {
        select: {
          id:true,
          firstName: true,
          lastName: true,
          profileImage:true,
        }
      },
      auction: {
        select: {
          id:true,
          finishDate: true,
          minAmount: true,
          nftOwnerId:true,
          nft: {
            select: {
              id: true,
              name: true,
              imageForNft: {
                select: {
                  nftImage: {
                    select: {
                      url: true
                    }
                  }
                }
              },
            }
          },
        }
      },

    }
  })
  return bid
}

export const createBid = async (data: Bid) => {
  const bid = await prisma.bid.create({
    data: { ...data }
  });

  return bid
} 