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
exports.createBid = exports.getAllBid = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllBid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bid = yield prisma.bid.findMany({
        where: {
            auctionId: id
        },
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
            },
            auction: {
                select: {
                    id: true,
                    finishDate: true,
                    minAmount: true,
                    nftOwnerId: true,
                    nft: {
                        select: {
                            id: true,
                            name: true,
                            imageForNft: {
                                select: {
                                    nftImage: {
                                        select: {
                                            url: true
                                        }
                                    }
                                }
                            },
                        }
                    },
                }
            },
        }
    });
    return bid;
});
exports.getAllBid = getAllBid;
const createBid = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const bid = yield prisma.bid.create({
        data: Object.assign({}, data)
    });
    return bid;
});
exports.createBid = createBid;
