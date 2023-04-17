import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { UserAttributes } from '../../types/user';

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'admin'
>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare username: string;
  declare password: string;
  declare name: string;
  declare admin: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

const UserModel = (sequelize: Sequelize) => {
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: new DataTypes.STRING(128),
        unique: true,
        allowNull: false
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
};

export default UserModel;
