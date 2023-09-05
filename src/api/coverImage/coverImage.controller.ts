import { Request, Response } from "express";

import { AuthRequest } from "../../auth/auth.types";

import { User } from "../user/user.types";

import {
    getCoverImage,
    createCoverImage,
    updateCoverImage,
    getCoverImageByUserId,
    deleteCoverImage
} from "./coverImage.service";

export const getCoverImageHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const coverImage = await getCoverImage(id);

    res.status(200).json(coverImage);
}

export const createCoverImageHandler = async (req: AuthRequest, res: Response) => {
    const { url } = req.body;
    const { id } = req.user as User;

    const coverImage = await createCoverImage(url, id);

    res.status(201).json(coverImage);
}

export const updateCoverImageHandler = async (req: AuthRequest, res: Response) => {
    const { url } = req.body;
    const { id: userId } = req.user as User;

    const currentCoverImage = await getCoverImageByUserId(userId);

    if (!currentCoverImage) {
        return res.status(404).json({ message: 'Cover image not found' });
    }

    const { id } = currentCoverImage;

    await updateCoverImage(url, id);

    res.status(201).json({ message: 'Cover image updated successfully' });
}

export const deleteCoverImageHandler = async (req: AuthRequest, res: Response) => {
    const { id: userId } = req.user as User;

    const currentCoverImage = await getCoverImageByUserId(userId);

    if (!currentCoverImage) {
        return res.status(404).json({ message: 'Cover image not found' });
    }

    const { id } = currentCoverImage;

    await deleteCoverImage(id);

    res.status(201).json({ message: 'Cover image deleted' });
}