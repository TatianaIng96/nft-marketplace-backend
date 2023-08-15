import { Response, NextFunction } from 'express';

import { getUserByEmail } from '../api/user/user.service';
import { AuthRequest } from './auth.types';
import { User } from '../api/user/user.types';
import { verifyToken } from './auth.service';



export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Verify token
  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await getUserByEmail(decoded.email) as User

  req.user = user

  return next();
}

export const hasRole = (allowedRole: string) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { role } = req.user as User;
    // const userRoles = roles.map(({ Role }: any) => Role.name)
    // const hasPermission = allowRoles.some((role) => userRoles.includes(role))
    const hasPermission = allowedRole.includes(role);

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    next();
  }
}