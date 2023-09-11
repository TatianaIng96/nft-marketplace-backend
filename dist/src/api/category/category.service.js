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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryByName = exports.getSingleCategory = exports.getAllCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma.category.findMany({
        select: {
            id: false,
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
    return categories;
});
exports.getAllCategories = getAllCategories;
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma.category.findUnique({
        where: { id },
        select: {
            id: false,
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
    return category;
});
exports.getSingleCategory = getSingleCategory;
const getCategoryByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield prisma.category.findUnique({
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
    return category;
});
exports.getCategoryByName = getCategoryByName;
const createCategory = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const createdCategory = yield prisma.category.create({
        data: body,
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
                    price: true
                }
            }
        }
    });
    return createdCategory;
});
exports.createCategory = createCategory;
const updateCategory = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCategory = yield prisma.category.update({
        where: { id },
        data: body
    });
    return updatedCategory;
});
exports.updateCategory = updateCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCategory = yield prisma.category.delete({
        where: { id }
    });
    return deletedCategory;
});
exports.deleteCategory = deleteCategory;
