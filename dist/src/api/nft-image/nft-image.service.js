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
exports.deleteNftImage = exports.createNftImage = exports.getSingleNftImage = exports.getLast3Images = exports.getAllNftImage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllNftImage = () => __awaiter(void 0, void 0, void 0, function* () {
    const nftImage = yield prisma.nftImage.findMany({
        include: {
            imageForNft: {
                select: {
                    nftImage: {
                        select: {
                            url: true
                        }
                    }
                }
            }
        }
    });
    return nftImage;
});
exports.getAllNftImage = getAllNftImage;
const getLast3Images = () => __awaiter(void 0, void 0, void 0, function* () {
    const nftImage = yield prisma.nftImage.findMany({
        take: 3,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            imageForNft: {
                select: {
                    nftImage: {
                        select: {
                            url: true
                        }
                    }
                }
            }
        }
    });
    return nftImage;
});
exports.getLast3Images = getLast3Images;
const getSingleNftImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nftImage = yield prisma.nftImage.findUnique({
        where: {
            id
        }
    });
    return nftImage;
});
exports.getSingleNftImage = getSingleNftImage;
const createNftImage = (inputData) => __awaiter(void 0, void 0, void 0, function* () {
    const { url_1, url_2, url_3 } = inputData;
    const nftImage_1 = yield prisma.nftImage.create({
        data: {
            url: url_1,
        }
    });
    const nftImage_2 = yield prisma.nftImage.create({
        data: {
            url: url_2,
        }
    });
    const nftImage_3 = yield prisma.nftImage.create({
        data: {
            url: url_3,
        }
    });
    return [nftImage_1, nftImage_2, nftImage_3];
});
exports.createNftImage = createNftImage;
const deleteNftImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nftImage = yield prisma.nftImage.deleteMany({
        where: {
            id
        },
    });
    return nftImage;
});
exports.deleteNftImage = deleteNftImage;
