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
exports.deleteCollection = exports.createCollection = exports.updateCollection = exports.getCollectionByName = exports.getCollectionById = exports.getAllCollections = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield prisma.collection.findMany({
        select: {
            name: true,
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
                    description: true,
                    price: true
                }
            }
        }
    });
    return collections;
});
exports.getAllCollections = getAllCollections;
const getCollectionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleCollection = yield prisma.collection.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
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
                    description: true,
                    price: true
                }
            }
        }
    });
    return singleCollection;
});
exports.getCollectionById = getCollectionById;
const getCollectionByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield prisma.collection.findUnique({
        where: { name },
        select: {
            id: true,
            name: true,
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
                    description: true,
                    price: true
                }
            },
            createdAt: false,
            updateAt: false
        }
    });
    return collection;
});
exports.getCollectionByName = getCollectionByName;
const updateCollection = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionUpdated = yield prisma.collection.update({
        where: { id },
        data: Object.assign({}, input)
    });
    return collectionUpdated;
});
exports.updateCollection = updateCollection;
const createCollection = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const newCollection = yield prisma.collection.create({
        data: Object.assign({}, input)
    });
    return newCollection;
});
exports.createCollection = createCollection;
const deleteCollection = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteSingleCollection = yield prisma.collection.delete({
        where: { id }
    });
    return deleteSingleCollection;
});
exports.deleteCollection = deleteCollection;
