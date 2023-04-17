import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginAttributes, RegisterAttributes } from '../types/user';
import { createUser, getUserByName } from '../services/userService';
import { AuthException, ServerException } from '../errors';

const SECRET = process.env.JWT_SECRET as string;

class AuthenticationController {
  public async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body as LoginAttributes;
    try {
      const user = await getUserByName(username);
      if (!user) return next(new AuthException('Invalid credentials'));

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return next(new AuthException('Invalid credentials'));

      const token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: '1h'
      });

      res.send({ token });
    } catch (err) {
      console.log(err);
      return next(new ServerException());
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, name, admin } =
        req.body as RegisterAttributes;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await createUser({
        username,
        password: hashedPassword,
        name,
        admin
      });
      if (!newUser) return next(new ServerException());

      const token = jwt.sign({ id: newUser.id }, SECRET, {
        expiresIn: '1h'
      });

      res.send({ token });
    } catch (err) {
      return next(new ServerException());
    }
  }
}

export default AuthenticationController;
