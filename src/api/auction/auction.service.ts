import { PrismaClient } from "@prisma/client";
import { Auction } from "./auction.types";

const prisma = new PrismaClient();

export const getAllAuctions = async () => {
    const auctions = await prisma.auction.findMany({
        include: {
            bid: {
                select: {
                    amount: true,
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true
                        }
                    }
                }
            },
            nft: {
                select: {
                    image: true,
                    name: true
                }
            },
            nftOwner: {
                select: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true
                        }
                    }
                }
            }
        },
    });

    return auctions;
}

export const getSingleAuction = async (id: number) => {
    const auction = await prisma.auction.findUnique({
        where: {
            id
        },
        include: {
            bid: {
                select: {
                    amount: true,
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true
                        }
                    }
                }
            },
            nft: {
                select: {
                    image: true,
                    name: true
                }
            },
            nftOwner: {
                select: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true
                        }
                    }
                }
            }
        }
    });

    return auction;
}

export const createAuction = async (body: Auction) => {
    const createdAuction = await prisma.auction.create({
        data: body
    });

    return createdAuction;
}

export const updateAuction = async (id: number, body: Auction) => {
    const updatedAuction = prisma.auction.update({
        where: { id },
        data: body
    });

    return updatedAuction;
}

export const deleteAuction = async (id: number) => {
    const deletedAuction = prisma.auction.delete({
        where: { id }
    });

    return deletedAuction;
}