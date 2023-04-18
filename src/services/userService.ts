import { models } from '../database';
import { ServerException } from '../errors';
import { UserAttributes } from '../types/user';

const User = models.User;

const getUserByName = async (username: string) => {
  try {
    const user = await User.findOne({
      where: {
        username
      }
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return new ServerException();
    }
  }
};

const getUserById = async (id: number) => {
  try {
    const user = await User.findOne({
      where: {
        id
      }
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return new ServerException();
    }
  }
};

const createUser = async (user: UserAttributes) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return new ServerException();
    }
  }
};

export { getUserByName, getUserById, createUser };
