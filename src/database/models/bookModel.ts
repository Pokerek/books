import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { BookAttributes } from '../../types/Book';

type BookCreationAttributes = Optional<
  BookAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'available'
>;

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number;
  public title!: string;
  public author!: string;
  public isbn!: string;
  public available!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
