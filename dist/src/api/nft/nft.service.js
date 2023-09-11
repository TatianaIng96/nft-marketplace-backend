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
exports.filterCollection = exports.filterCategory = exports.deleteNft = exports.updateNFT = exports.createNft = exports.getNfUserIdOwner = exports.getNfUserIdAuction = exports.getNfUserId = exports.getNftById = exports.getAllNft = void 0;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
const now = new Date(); // Obtiene la fecha y hora actual
const getAllNft = (likes, categoryId, collectionId, price, page = 1, pageSize = 3) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * pageSize;
    const nftFilters = {
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
        nftFilters.where = Object.assign(Object.assign({}, nftFilters.where), { categoryId });
    }
    if (collectionId !== undefined) {
        nftFilters.where = Object.assign(Object.assign({}, nftFilters.where), { collectionId });
    }
    if (price !== undefined) {
        nftFilters.where = Object.assign(Object.assign({}, nftFilters.where), { price: {
                gt: 0,
                lt: price
            } });
    }
    const [nfts, totalNfts] = yield Promise.all([
        prisma.nft.findMany(nftFilters),
        prisma.nft.count()
    ]);
    return { nfts, totalNfts };
});
exports.getAllNft = getAllNft;
const getNftById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield prisma.nft.findUnique({
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
    });
    return nft;
});
exports.getNftById = getNftById;
const getNfUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield prisma.nft.findMany({
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
    });
    return nft;
});
exports.getNfUserId = getNfUserId;
const getNfUserIdAuction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date(); // Fecha actual
    const oneMillisecond = 1; // Un milisegundo para restar
    const currentDateMinusOneMillisecond = (0, date_fns_1.subMilliseconds)(currentDate, oneMillisecond);
    const nft = yield prisma.nft.findMany({
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
});
exports.getNfUserIdAuction = getNfUserIdAuction;
const getNfUserIdOwner = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield prisma.nft.findMany({
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
});
exports.getNfUserIdOwner = getNfUserIdOwner;
const createNft = (input, id) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield prisma.nft.create({
        data: Object.assign(Object.assign({}, input), { userId: id }),
    });
    return nft;
});
exports.createNft = createNft;
const updateNFT = (input, id) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield prisma.nft.update({
        where: {
            id
        },
        data: Object.assign({}, input)
    });
    return nft;
});
exports.updateNFT = updateNFT;
const deleteNft = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield prisma.nft.delete({
        where: {
            id,
        },
    });
    return nft;
});
exports.deleteNft = deleteNft;
const filterCategory = (category) => {
    const categories = {
        "art": 2,
        "music": 3,
        "video": 4,
        "collectionable": 5,
    };
    let categoryId;
    for (let key in categories) {
        const value = categories[key];
        if (key === category) {
            categoryId = value;
            break; // Si encontramos la clave "art", salimos del bucle
        }
    }
    return categoryId;
};
exports.filterCategory = filterCategory;
const filterCollection = (collection) => {
    const collections = {
        "art-decco": 2,
        "bored-ape-yacht-club": 3,
        "mutant-ape-yacht-club": 4,
        "art-blocks-factory": 5
    };
    let collectionId;
    for (let key in collections) {
        const value = collections[key];
        if (key === collection) {
            collectionId = value;
            break; // Si encontramos la clave "art", salimos del bucle
        }
    }
    return collectionId;
};
exports.filterCollection = filterCollection;
