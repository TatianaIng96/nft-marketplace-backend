import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllNft = async () => {
    const nft = await prisma.nft.findMany()
    return nft
}