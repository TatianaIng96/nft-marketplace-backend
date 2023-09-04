import { PrismaClient } from "@prisma/client";

import { Nft } from "./nft.types";
import { User } from '../user/user.types';
import { Collection } from '../collection/collection.types';

const prisma = new PrismaClient()
const now = new Date(); // Obtiene la fecha y hora actual

export const getAllNft = async (likes?: string, categoryId?:number, collectionId?: number, price?: number) => {
    const nftFilters:any = {
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
            },
        },
    
    };

    if (likes !== undefined) {
        nftFilters.orderBy = { like: { _count: likes === "most" ? "desc" : "asc" } };
    }

    if (categoryId !== undefined) {
        nftFilters.where = { ...nftFilters.where, categoryId };
    }

    if (collectionId !== undefined) {
        nftFilters.where = { ...nftFilters.where, collectionId };
    }

    if (price !== undefined) {
        nftFilters.where = {
            ...nftFilters.where,
            price: {
                gt: 0,
                lt: price
            }
        };
    }

    const nfts = await prisma.nft.findMany(nftFilters);
    return nfts
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
                    createdAt: 'desc' // Ordenar subastas por createdAt en orden descendente
                },
                where: {
                    nftId: id // Filtrar subastas por nftOwnerId igual a id del NFT
                },
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

export const filterCategory = (category: string | undefined) => {

    const categories:{ [key: string]: number }= { 
        "art": 2, 
        "music": 4, 
        "video": 5, 
        "collectionable": 6,
    }
 
    let categoryId :number | undefined;

    for (let key in categories) {
        const value= categories[key];
        if (key === category) {
        categoryId = value;
        break; // Si encontramos la clave "art", salimos del bucle
        }
    }

    return categoryId
}
export const filterCollection = (collection: string | undefined) => {
    const collections:{ [key: string]: number }= { 
        "art-decco": 2,
        "bored-ape-yacht-club": 4, 
        "mutant-ape-yacht-club": 5, 
        "art-blocks-factory": 6
    }
 
    let collectionId :number | undefined;

    for (let key in collections) {
        const value= collections[key];
        if (key === collection) {
        collectionId = value;
        break; // Si encontramos la clave "art", salimos del bucle
        }
    }

    return collectionId
}