import { Request, Response } from "express";

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "./user.service";

export const getAllUsersHandler = async (_: Request, res: Response) => {
    const users = await getAllUsers();

    return res.status(200).json(users);
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await getUserById(id);

    return res.status(200).json(user);
}

export const createUserHandler = async (req: Request, res: Response) => {
    const { body } = req;

    const user = await createUser(body);

    return res.status(201).json(user);
}

export const updateUserHandler = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    const updatedUser = await updateUser(id, body);

    return res.status(201).json(updatedUser);
}

export const deleteUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    return res.status(201).json(deletedUser);
}