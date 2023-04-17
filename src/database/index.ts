import { Dialect, Sequelize } from 'sequelize';
import UserModel from './models/userModel';
import BookModel from './models/bookModel';
import config from './config/config.json';

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    dialect: config.development.dialect as Dialect,
    host: config.development.host
  }
);

const models = {
  Book: BookModel(sequelize),
  User: UserModel(sequelize)
};

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
export { connectDB, models };
