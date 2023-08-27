import { PrismaClient } from "@prisma/client";
import { Auction } from "./auction.types";

const prisma = new PrismaClient();

export const getAllAuctions = async () => {
    const auctions = await prisma.auction.findMany({
        select: {
            finishDate: true,
            minAmount: true,
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
                    imageForNft: {
                        select: {
                            nftImage: {
                                select: {
                                    url: true
                                }
                            }
                        }
                    },
                    name: true
                }
            },
            nftOwner: {
                select: {
                    user: {
                        select: {
                            id:true,
                            firstName: true,
                            lastName: true,
                            email: true
                        }
                    }
                }
            }
        }
    });

    return auctions;
}
export const getAllAuctionsNft = async (id:string) => {
    const auctions = await prisma.auction.findMany({
        where:{
            nftId: id
        },
        select: {
            id: true,
            finishDate: true,
            minAmount: true,
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
                    imageForNft: {
                        select: {
                            nftImage: {
                                select: {
                                    url: true
                                }
                            }
                        }
                    },
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
            },
        },
        orderBy: {
            createdAt: 'desc' // Ordenar por createdAt en orden descendente
        }
    });

    return auctions;
}

export const getSingleAuction = async (id: number) => {
    const auction = await prisma.auction.findUnique({
        where: {
            id
        },
        select: {
            id:true,
            finishDate: true,
            minAmount: true,
            nftOwnerId:true,
            createdAt:true,
            bid: {
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
                    }
                },
                orderBy: {
                    createdAt: 'desc' // Ordenar por createdAt en orden descendente
                },
            },
            nft: {
                select: {
                    imageForNft: {
                        select: {
                            nftImage: {
                                select: {
                                    url: true
                                }
                            }
                        }
                    },
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
        data: body,
        select: {
            finishDate: true,
            minAmount: true,
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
                    imageForNft: {
                        select: {
                            nftImage: {
                                select: {
                                    url: true
                                }
                            }
                        }
                    },
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

    return createdAuction;
}

/* export const updateAuction = async (id: number, body: Auction) => {
    const updatedAuction = prisma.auction.update({
        where: { id },
        data: body,
        select: {
            finishDate: true,
            minAmount: true,
            status: true,
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

    return updatedAuction;
}

export const deleteAuction = async (id: number) => {
    const deletedAuction = prisma.auction.delete({
        where: { id }
    });

    return deletedAuction;
} */
