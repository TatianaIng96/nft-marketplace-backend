import { Request, Response } from "express";
import { hashPassword } from "../../auth/utils/bcrypt";

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "./user.service";
import { AuthRequest } from "../../auth/auth.types";
import { User } from './user.types';

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
    const body = req.body;
    const hashedPassword = await hashPassword(body.password);

    const data = {
        ...body,
        password: hashedPassword
    }

    const user = await createUser(data);

    return res.status(201).json(user);
}

export const updateUserHandler = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    const updatedUser = await updateUser(id, body);

    return res.status(201).json(updatedUser);
}

export const deleteUserHandler = async (req: AuthRequest, res: Response) => {
    const { id } = req.user as User

    const deletedUser = await deleteUser(id);

    return res.status(201).json(deletedUser);
}