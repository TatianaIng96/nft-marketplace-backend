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
exports.deleteCoverImage = exports.updateCoverImage = exports.createCoverImage = exports.getCoverImageByUserId = exports.getCoverImage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCoverImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = yield prisma.coverImage.findUnique({
        where: { id }
    });
    return coverImage;
});
exports.getCoverImage = getCoverImage;
const getCoverImageByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = yield prisma.coverImage.findFirst({
        where: { userId },
    });
    return coverImage;
});
exports.getCoverImageByUserId = getCoverImageByUserId;
const createCoverImage = (url, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = yield prisma.coverImage.create({
        data: {
            url,
            userId
        },
        include: {
            user: {
                select: {
                    coverImage: true
                }
            }
        }
    });
    return coverImage;
});
exports.createCoverImage = createCoverImage;
const updateCoverImage = (url, id) => __awaiter(void 0, void 0, void 0, function* () {
    const coverImage = yield prisma.coverImage.update({
        where: { id },
        data: { url }
    });
    return coverImage;
});
exports.updateCoverImage = updateCoverImage;
const deleteCoverImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.coverImage.delete({ where: { id } });
});
exports.deleteCoverImage = deleteCoverImage;
