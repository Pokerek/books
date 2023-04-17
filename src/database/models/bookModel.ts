import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { BookAttributes } from '../../types/book';

type BookCreationAttributes = Optional<
  BookAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'available'
>;

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  declare id: number;
  declare title: string;
  declare author: string;
  declare isbn: string;
  declare available: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

const BookModel = (sequelize: Sequelize) => {
  return Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      author: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      isbn: {
        type: new DataTypes.STRING(13),
        allowNull: false
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'Book'
    }
  );
};

export default BookModel;
