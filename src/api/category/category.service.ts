import { PrismaClient } from "@prisma/client";

import { Category } from "./category.types"

const prisma = new PrismaClient();

export const getAllCategories = async () => {
    const categories = await prisma.category.findMany({
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
}

export const getSingleCategory = async (id: number) => {
    const category = await prisma.category.findUnique({
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
}

export const getCategoryByName = async (name: string) => {
    const category = await prisma.category.findUnique({
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
}

export const createCategory = async (body: Category) => {
    const createdCategory = await prisma.category.create({
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
}

export const updateCategory = async (id: number, body: Category) => {
    const updatedCategory = await prisma.category.update({
        where: { id },
        data: body
    });

    return updatedCategory;
}

export const deleteCategory = async (id: number) => {
    const deletedCategory = await prisma.category.delete({
        where: { id }
    });

    return deletedCategory;
}