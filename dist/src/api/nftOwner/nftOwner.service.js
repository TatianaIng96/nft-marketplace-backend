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
exports.updateNftOwner = exports.createNftOwner = exports.getNftOwnerById = exports.getAllNftOwners = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllNftOwners = () => __awaiter(void 0, void 0, void 0, function* () {
    const nftOwners = yield prisma.nftOwner.findMany({
        select: {
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
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true
                }
            },
        },
    });
    return nftOwners;
});
exports.getAllNftOwners = getAllNftOwners;
const getNftOwnerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = yield prisma.nftOwner.findUnique({
        where: {
            id
        },
        select: {
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
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                }
            },
        }
    });
    return owner;
});
exports.getNftOwnerById = getNftOwnerById;
const createNftOwner = (inputData) => __awaiter(void 0, void 0, void 0, function* () {
    const createNftOwner = yield prisma.nftOwner.create({
        data: Object.assign({}, inputData)
    });
    return createNftOwner;
});
exports.createNftOwner = createNftOwner;
const updateNftOwner = (id, inputData) => __awaiter(void 0, void 0, void 0, function* () {
    const updateSingleNftOwner = yield prisma.nftOwner.update({
        where: { id },
        data: Object.assign({}, inputData)
    });
    return updateSingleNftOwner;
});
exports.updateNftOwner = updateNftOwner;
