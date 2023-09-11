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
exports.deleteUser = exports.updatePassword = exports.updateUser = exports.createUser = exports.getUserByEmail = exports.getUserByValidateToken = exports.getSingleUser = exports.getWholeUser = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        include: {
            profileImage: true,
            coverImage: true,
        }
    });
    return users;
});
exports.getAllUsers = getAllUsers;
const getWholeUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const wholeUser = yield prisma.user.findUnique({
        where: { id },
    });
    return wholeUser;
});
exports.getWholeUser = getWholeUser;
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            bio: true,
            gender: true,
            currency: true,
            password: true,
            phone: true,
            location: true,
            address: true,
            validateToken: true,
            profileImage: true,
            coverImage: true,
            transaction: true,
            nftOwner: true,
            bid: true,
            like: {
                select: {
                    nft: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    id: false,
                    userId: false,
                    nftId: false,
                    createdAt: false,
                    updateAt: false
                }
            },
            nft: true
        }
    });
    return user;
});
exports.getSingleUser = getSingleUser;
const getUserByValidateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            validateToken: token
        }
    });
    return user;
});
exports.getUserByValidateToken = getUserByValidateToken;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            email
        }
    });
    return user;
});
exports.getUserByEmail = getUserByEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const data = user;
    const createdUser = yield prisma.user.create({
        data,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            validateToken: true,
            tokenExpires: true,
        }
    });
    return createdUser;
});
exports.createUser = createUser;
const updateUser = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const data = body;
    const updatedUser = yield prisma.user.update({
        where: {
            id
        },
        data,
        select: {
            firstName: true,
            lastName: true,
            email: true,
            bio: true,
            role: true,
            gender: true,
            currency: true,
            phone: true,
            location: true,
            address: true,
            profileImage: {
                select: {
                    url: true
                }
            },
            coverImage: {
                select: {
                    url: true
                }
            },
            nftOwner: true,
            nft: true,
            bid: true,
            like: true,
        }
    });
    return updatedUser;
});
exports.updateUser = updateUser;
const updatePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserPassword = yield prisma.user.update({
        where: { id },
        data: {
            password: password,
        },
    });
    return updateUserPassword;
});
exports.updatePassword = updatePassword;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield prisma.user.delete({
        where: {
            id
        }
    });
    return deletedUser;
});
exports.deleteUser = deleteUser;
