import { Request, Response } from "express";
import { hashPassword, createValidationToken, comparePassword } from "../../auth/utils/bcrypt";

import {
    getAllUsers,
    getSingleUser,
    createUser,
    updatePassword,
    updateUser,
    deleteUser,
    getUserByEmail,
    getWholeUser
} from "./user.service";
import { AuthRequest } from "../../auth/auth.types";
import { User, CreatedUser } from './user.types';
import { signToken } from "../../auth/auth.service";
import { sendMailWithSendgrid } from "../../config/sendGrid";
import { welcomeEmail, recoverPasswordEmail } from "../../utils/emails";

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
    const body = req.body as User;
    const hashedPassword = await hashPassword(body.password);

    const data = {
        ...body,
        password: hashedPassword,
        validateToken: createValidationToken(body.email),
        tokenExpires: new Date(Date.now() + 1000 * 60 * 60 * 24),
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
        role: user.role,
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

export const updatePasswordHandler = async (req: AuthRequest, res: Response) => {
    const { id } = req.user!;
    const body = req.body;

    const loggedUser = await getSingleUser(id);

    if (!loggedUser) {
        return "Not find user"
    }

    const match = await comparePassword(body.oldPassword, loggedUser.password)

    if (!match) {
        return "Old password do not match, incorrect password"
    }

    const hashedPassword = await hashPassword(body.newPassword);

    const updateUserPassword = await updatePassword(id, hashedPassword);
    res.status(201).json({ message: 'Password succesfully updated', updateUserPassword });
}

export const recoverPasswordHandler = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'The email is not registered in our database' });
        }

        sendMailWithSendgrid(recoverPasswordEmail(user));

        res.status(201).json({ message: 'Successful' });
    } catch (error: any) { }
}

export const newPasswordHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await getSingleUser(id);

    if (!user) {
        return res.status(401).json({ message: 'User ID does not match any user in the database' })
    }

    const userToUpdate = await getUserByEmail(user.email)

    if (!userToUpdate) {
        return res.status(401).json({ message: 'User ID does not match any user in the database' })
    }

    const data = {
        ...userToUpdate,
        password: hashedPassword,
    }

    const updatedUser = await updateUser(id, data);

    res.status(201).json({ message: 'Password succesfully updated', updatedUser });
}

export const deleteUserHandler = async (req: AuthRequest, res: Response) => {
    const { id } = req.user as User;

    const deletedUser = await deleteUser(id);

    return res.status(201).json({ message: 'User deleted successfully!', deletedUser });
}

export const deleteUserByAdminHandler = async (req: AuthRequest, res: Response) => {
    const { id: userId } = req.params;

    const userToInactivate = await getWholeUser(userId);

    if (!userToInactivate) {
        return res.status(500).json({ message: 'User not found in our database' });
    }

    const data = {
        ...userToInactivate,
        isActive: false,
    }

    await updateUser(userId, data as User);

    return res.status(201).json({ message: 'User has been inactivated in the database' });
}