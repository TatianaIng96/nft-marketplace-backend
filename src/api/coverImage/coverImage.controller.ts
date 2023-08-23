import { Request, Response } from "express";

import { AuthRequest } from "../../auth/auth.types";

import { User } from "../user/user.types";

import {
    getCoverImage,
    createCoverImage,
    updateCoverImage
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
    const { id } = req.params;

    const loggedUser = req.user as User;
    const userId = loggedUser.id;

    const coverImage = await updateCoverImage(url, id);

    // crear servicio de updateUserCoverImage para que quede ligada la imagen al usuario logueado

    res.status(201).json(coverImage);
}