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
exports.deleteProfileImage = exports.updateProfileimage = exports.createProfileImage = exports.getProfileImageByUserId = exports.getProfileImage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProfileImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const profileImage = yield prisma.profileImage.findUnique({
        where: {
            id
        }
    });
    return profileImage;
});
exports.getProfileImage = getProfileImage;
const getProfileImageByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const profileImage = yield prisma.profileImage.findFirst({
        where: { userId },
    });
    return profileImage;
});
exports.getProfileImageByUserId = getProfileImageByUserId;
const createProfileImage = (url, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newProfileImage = yield prisma.profileImage.create({
        data: {
            url,
            userId
        },
        include: {
            user: {
                select: {
                    profileImage: true
                }
            }
        }
    });
    return newProfileImage;
});
exports.createProfileImage = createProfileImage;
const updateProfileimage = (id, url) => __awaiter(void 0, void 0, void 0, function* () {
    const updateImage = yield prisma.profileImage.update({
        where: { id },
        data: { url }
    });
    return updateImage;
});
exports.updateProfileimage = updateProfileimage;
const deleteProfileImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.profileImage.delete({ where: { id } });
});
exports.deleteProfileImage = deleteProfileImage;
