import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createImageForNft = async (nftId: string, nftImageId: string) => {
    const createdRelation = await prisma.imageForNft.create({
        data: { nftId, nftImageId }
    });

    return createdRelation;
}