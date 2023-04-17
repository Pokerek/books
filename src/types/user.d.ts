import { Request } from 'express';

declare interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  name: string;
  admin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

declare type LoginAttributes = Pick<UserAttributes, 'username' | 'password'>;
declare type RegisterAttributes = Pick<
  UserAttributes,
  'username' | 'password' | 'name' | 'admin'
>;

declare interface RequestWithUser extends Request {
  user?: UserAttributes;
}

export { UserAttributes, LoginAttributes, RegisterAttributes, RequestWithUser };
