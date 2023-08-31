import { Request, Response } from "express";
import { hashPassword } from "../../auth/utils/bcrypt";

import {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} from "./user.service";
import { AuthRequest } from "../../auth/auth.types";
import { User, CreatedUser } from './user.types';
import { signToken } from "../../auth/auth.service";
import { sendMailWithSendgrid } from "../../config/sendGridjccs";
import { welcomeEmail } from "../../utils/emails";

export const getAllUsersHandler = async (_: Request, res: Response) => {
    const users = await getAllUsers();

    return res.status(200).json(users);
}

export const getSingleUserHandler = async (req: AuthRequest, res: Response) => {
    const { id } = req.user as User;

    const user = await getSingleUser(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user);
}

export const getUserByIdHandler = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const user = await getSingleUser(id);

    return res.status(200).json(user);
}

export const createUserHandler = async (req: Request, res: Response) => {
    const body = req.body;
    const hashedPassword = await hashPassword(body.password);

    const data = {
        ...body,
        password: hashedPassword
    }

    const user: CreatedUser = await createUser(data);

    const payload = {
        id: user.id,
        email: user.email,
    }

    const token = signToken(payload);

    const profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
    }

    sendMailWithSendgrid(welcomeEmail(user));

    return res.status(201).json({ message: 'User created successfully!', token, profile });
}

export const adminCreateUserHandler = async (req: Request, res: Response) => {
    const { body } = req;

    const hashedPassword = await hashPassword(body.password);

    const data = {
        ...body,
        password: hashedPassword
    }

    const user = await createUser(data);

    return res.status(201).json(user);
}

export const updateUserHandler = async (req: AuthRequest, res: Response) => {
    const { body } = req;
    const { id } = req.user!;

    const updatedUser = await updateUser(id, body);

    return res.status(201).json({ message: 'User updated successfully!', updatedUser });
}

export const updateUserByIdHandler = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    const updatedUser = await updateUser(id, body);

    return res.status(201).json({ message: 'User updated successfully!', updatedUser });
}

export const deleteUserHandler = async (req: AuthRequest, res: Response) => {
    const { id } = req.user as User;

    const deletedUser = await deleteUser(id);

    return res.status(201).json({ message: 'User deleted successfully!', deletedUser });
}