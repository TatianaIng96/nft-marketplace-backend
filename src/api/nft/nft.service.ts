import { PrismaClient } from "@prisma/client";

import { Nft } from "./nft.types";
import { User } from '../user/user.types';

const prisma = new PrismaClient()
const now = new Date(); // Obtiene la fecha y hora actual

export const getAllNft = async () => {
    const nft = await prisma.nft.findMany({
        include: {
            like: {
                select: {
                    id: true
                }
            },
            auction: {
                select: {
                    id: true
                }
            },
            imageForNft: {
                select: {
                    nftImage: {
                        select: {
                            url: true
                        }
                    }
                }
            },
            nftOwner: {
                where: {
                    isCurrentOwner: true,
                },
                select: {
                    id:true,
                    user: {
                        select: {
                            id: true,
                            firstName: true
                        }
                    }
                }
            }
        }
    })
    return nft
}

export const getNftById = async (id: string) => {
    const nft = await prisma.nft.findUnique({
        where: {
            id,
        },
        include: {
            like: {
                select: {
                    id: true
                }
            },
            auction: {
                orderBy: {
                    createdAt: 'asc' // Ordenar subastas por createdAt en orden descendente
                },
                take: 1,
                select: {
                    id: true,
                    finishDate: true,
                },
            },
            imageForNft: {
                select: {
                    nftImage: {
                        select: {
                            url: true
                        }
                    }
                }
            },
            nftOwner: {
                where: {
                    isCurrentOwner: true,
                },
                select: {
                    user: {
                        select: {
                            id: true,
                            firstName: true
                        }
                    }
                }
            }
        }
    })
    return nft
}

export const createNft = async (input: Nft, id: string) => {
    const nft = await prisma.nft.create({
        data: {
            ...input,
            userId: id
        },
    })

    return nft
}

export const updateNFT = async (input: Nft, id: string) => {
    const nft = await prisma.nft.update({
        where: {
            id
        },
        data: { ...input }
    })

    return nft
}

export const deleteNft = async (id: string) => {

    const nft = await prisma.nft.delete({
        where: {
            id,
        },
    });

    return nft;
}