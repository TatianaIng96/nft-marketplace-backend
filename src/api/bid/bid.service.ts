import { PrismaClient } from "@prisma/client";
import { Bid } from './bid.types';
import { Nft } from '../nft/nft.types';

const prisma = new PrismaClient()

export const getAllBid = async (id:number) => {
  const bid = await prisma.bid.findMany({
    where: {
      auctionId: id
    },
    select: {
      amount:true,
      createdAt:true,
      user: {
        select: {
          firstName: true,
          lastName:true
        }
      },
      auction:{
        select:{
          finishDate:true,
          minAmount:true,
          nft:{
            select: {
              name:true,
              image: true
            }
          },
        }
      },
      
    }
  })
  return bid
}

export const createBid =async (data:Bid) => {
  const bid = await prisma.bid.create({
    data: {...data}
  });
    
  return bid
} 