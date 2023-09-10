import { PrismaClient } from "@prisma/client";
import { getUnixTime, subMilliseconds } from 'date-fns';

import { Nft } from "./nft.types";

const prisma = new PrismaClient()
const now = new Date(); // Obtiene la fecha y hora actual

export const getAllNft = async (likes?: string, categoryId?: number, collectionId?: number, price?: number, page: number = 1, pageSize: number = 3) => {
    const skip = (page - 1) * pageSize;
    const nftFilters: any = {
        skip,
        take: pageSize,
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
                    id: true,
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

    const [nfts, totalNfts] = await Promise.all([
        prisma.nft.findMany(nftFilters),
        prisma.nft.count()
    ])

    return { nfts, totalNfts }
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
                    bid: true
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
export const getNfUserId = async (id: string) => {
    const nft = await prisma.nft.findMany({
        where: {
            userId: id,
        },
        include: {
            like: {
                select: {
                    id: true
                }
            },
            auction: {
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    nftId: id
                },
                select: {
                    id: true,
                    finishDate: true,
                    bid: true
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
export const getNfUserIdAuction = async (id: string) => {
    const currentDate = new Date(); // Fecha actual
    const oneMillisecond = 1; // Un milisegundo para restar

    const currentDateMinusOneMillisecond = subMilliseconds(currentDate, oneMillisecond);

    const nft = await prisma.nft.findMany({
        where: {
            nftOwner: {
                some: {
                    userId: id,
                    isCurrentOwner: true,
                },
            },
            auction: {
                some: {
                    finishDate: {
                        gte: currentDateMinusOneMillisecond,
                    },
                },
            },
        },
        include: {
            like: {
                select: {
                    id: true
                }
            },
            auction: {
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    finishDate: {
                        gte: currentDateMinusOneMillisecond,
                    },
                },
                select: {
                    id: true,
                    finishDate: true,
                    bid: true
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
                    userId: id,
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
    });

    return nft;
}
export const getNfUserIdOwner = async (id: string) => {

    const nft = await prisma.nft.findMany({
        where: {
            nftOwner: {
                some: {
                    userId: id,
                    isCurrentOwner: true,
                },
            }
        },
        include: {
            like: {
                select: {
                    id: true
                }
            },
            auction: {
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    finishDate: true,
                    bid: true
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
                    userId: id,
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
    });

    return nft;
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

    const categories: { [key: string]: number } = {
        "art": 2,
        "music": 3,
        "video": 4,
        "collectionable": 5,
    }

    let categoryId: number | undefined;

    for (let key in categories) {
        const value = categories[key];
        if (key === category) {
            categoryId = value;
            break; // Si encontramos la clave "art", salimos del bucle
        }
    }

    return categoryId
}
export const filterCollection = (collection: string | undefined) => {
    const collections: { [key: string]: number } = {
        "art-decco": 2,
        "bored-ape-yacht-club": 3,
        "mutant-ape-yacht-club": 4,
        "art-blocks-factory": 5
    }

    let collectionId: number | undefined;

    for (let key in collections) {
        const value = collections[key];
        if (key === collection) {
            collectionId = value;
            break; // Si encontramos la clave "art", salimos del bucle
        }
    }

    return collectionId
}