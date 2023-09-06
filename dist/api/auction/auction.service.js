"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuction = exports.getSingleAuction = exports.getAllAuctionsNft = exports.getAllAuctions = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllAuctions = () => __awaiter(void 0, void 0, void 0, function* () {
    const auctions = yield prisma.auction.findMany({
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
                            id: true,
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
});
exports.getAllAuctions = getAllAuctions;
const getAllAuctionsNft = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const auctions = yield prisma.auction.findMany({
        where: {
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
});
exports.getAllAuctionsNft = getAllAuctionsNft;
const getSingleAuction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const auction = yield prisma.auction.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            finishDate: true,
            minAmount: true,
            nftOwnerId: true,
            createdAt: true,
            bid: {
                select: {
                    id: true,
                    amount: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            profileImage: true,
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
                    name: true,
                    id: true,
                }
            },
            nftOwner: {
                select: {
                    id: true,
                    isCurrentOwner: true,
                    user: {
                        select: {
                            id: true,
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
});
exports.getSingleAuction = getSingleAuction;
const createAuction = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAuction = yield prisma.auction.create({
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
});
exports.createAuction = createAuction;
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
