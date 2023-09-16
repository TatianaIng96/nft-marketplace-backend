import { Request, Response } from "express"
import { createUser, getUserByEmail } from "../../api/user/user.service";
import { CreatedUser } from "../../api/user/user.types";
import { signToken } from "../auth.service";

export const handleGoogleRegister = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body

  try {
    const data = {
      ...req.body,
      firstName,
      lastName,
      email,
      isActive: true,
    };

    const checkEmail = await getUserByEmail(data.email)

    if (checkEmail) {
      return res.status(400).json({ message: "User already exist" })
    }

    const user: CreatedUser = await createUser(data);

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = signToken(payload);

    const profile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }

    res.status(201).json({ token, profile });
  } catch (error) {

    if (error instanceof Error) {
      res.status(500).json({ message: "There is an error creating user", error: error.message });
    } else {
      res.status(500).json({ message: "There is an error creating user" });
    }
  }

};

export const handleGoogleLogin = async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body

  try {
    const data = {
      ...req.body,
      firstName,
      lastName,
      email,
      isActive: true,
    };

    const user = await getUserByEmail(data.email);

    if (!user) {
      return res.status(400).json({ message: "User has no account with google in the database" })
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = signToken(payload);

    const profile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }

    res.status(201).json({ token, profile });
  } catch (error) {

    if (error instanceof Error) {
      res.status(500).json({ message: "There is an error creating user", error: error.message });
    } else {
      res.status(500).json({ message: "There is an error creating user" });
    }
  }

};