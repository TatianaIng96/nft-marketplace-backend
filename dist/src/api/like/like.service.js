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
exports.deleteLike = exports.createLike = exports.getByLike = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getByLike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const like = yield prisma.like.findMany({
        where: {
            nftId: id
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            },
            nft: {
                select: {
                    name: true
                }
            }
        }
    });
    return like;
});
exports.getByLike = getByLike;
const createLike = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const like = yield prisma.like.create({
        data: Object.assign({}, data)
    });
    return like;
});
exports.createLike = createLike;
const deleteLike = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Like = yield prisma.like.deleteMany({
        where: {
            nftId: data.nftId,
            userId: data.userId
        },
    });
    return Like;
});
exports.deleteLike = deleteLike;
