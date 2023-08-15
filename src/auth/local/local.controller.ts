import { Request, Response } from "express";
import { getUserByEmail } from "../../api/user/user.service";
import { comparePassword } from "../utils/bcrypt";
import { signToken } from '../auth.service';

export const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json('Invalid credentials');
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(401).json('Invalid credentials');
        }

        const payload = {
            id: user.id,
            email: user.email,
        }

        const token = signToken(payload)
        console.log(token);

        const profile = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

        return res.status(201).json({ token, profile });

    } catch (error) {
        return res.status(401).send('There has been an error accessing information. Try again later!')
    }
}