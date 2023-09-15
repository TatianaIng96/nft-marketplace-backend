import { Request, Response } from "express"
import { createUser, getUserByEmail } from "../../api/user/user.service";
import { CreatedUser } from "../../api/user/user.types";
import { signToken } from "../auth.service";

export const handleGoogleLogin = async (req: Request, res: Response) => {
  const { given_name, family_name, email } = req.body

  try {
    const data = {
      ...req.body,
      firstName: given_name || "",
      lastName: family_name || "",
      email: email || "",
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
    console.log(profile);

    res.status(201).json({ token, profile });
  } catch (error) {
    console.log("This is the error", error);

    if (error instanceof Error) {
      res.status(500).json({ message: "There is an error creating user", error: error.message });
    } else {
      res.status(500).json({ message: "There is an error creating user" });
    }
  }

};
