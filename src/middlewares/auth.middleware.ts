import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthException } from '../errors';
import { RequestWithUser } from '../types/user';
import { DataStoredInToken } from '../types/token';
import { getUserById } from '../services/userService';

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.JWT_SECRET as string;

  if (!authHeader) {
    return next(new AuthException('Token not provided'));
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(token, secret) as DataStoredInToken;
    const id = decoded.id;
    const user = await getUserById(id);
    if (!user) {
      return next(new AuthException('Invalid token'));
    }
    req.user = user;
    return next();
  } catch (err) {
    return next(new AuthException('Invalid token'));
  }
};

export default authMiddleware;
