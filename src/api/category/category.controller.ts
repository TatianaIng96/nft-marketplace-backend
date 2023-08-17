import { Request, Response } from "express";

import {
    getAllCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
} from "./category.service";

export const getAllCategoriesHandler = async (_: Request, res: Response) => {
    const categories = await getAllCategories();

    res.status(200).json(categories);
}

export const getSingleCategoryHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await getSingleCategory(parseInt(id));

    res.status(200).json(category);
}

export const createCategoryHandler = async (req: Request, res: Response) => {
    const { body } = req;

    const createdCategory = await createCategory(body);

    res.status(201).json(createdCategory);
}

export const updateCategoryHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    const updatedCategory = await updateCategory(parseInt(id), body);

    res.status(200).json(updatedCategory);
}

export const deleteCategoryHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedCategory = await deleteCategory(parseInt(id));

    res.status(200).json(deletedCategory);
}