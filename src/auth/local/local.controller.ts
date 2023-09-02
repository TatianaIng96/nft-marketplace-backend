import { Request, Response } from "express";
import {
    getUserByEmail,
    getUserByValidateToken,
    updateUser,
} from "../../api/user/user.service";
import { comparePassword } from "../utils/bcrypt";
import { signToken } from '../auth.service';

export const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json('Invalid email');
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(401).json('Invalid password');
        }

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

        return res.status(201).json({ token, profile });

    } catch (error) {
        return res.status(401).send('There has been an error accessing information. Try again later!')
    }
}

export const activateAccountHandler = async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
        const user = await getUserByValidateToken(token);

        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        if (user.tokenExpires) {
            if (Date.now() > user.tokenExpires.getTime()) {
                return res.status(401).json({ message: 'Token expired' });
            }
        }

        const data = {
            ...user,
            tokenExpires: null,
            validateToken: null,
            isActive: true,
        }

        await updateUser(user.id, data);

        const payload = {
            id: user.id,
            email: user.email,
        }

        const tokenToSend = signToken(payload);

        const profile = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }

        return res.status(201).json({ token: tokenToSend, profile });

    } catch (error) {

    }
}