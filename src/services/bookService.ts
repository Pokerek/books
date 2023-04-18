import { models } from '../database';
import { ServerException } from '../errors';
import HttpException from '../errors/HttpException';
import { BookAttributes } from '../types/book';

const Book = models.Book;

const getAllBooks = async (offset: number, limit: number) => {
  try {
    const books = await Book.findAndCountAll({
      offset,
      limit
    });
    return { books: books.rows, count: books.count };
  } catch (error) {
    if (error instanceof Error) {
      return { error: new HttpException(500, error.message) };
    }
  }
};

const getAllAvailableBooks = async (offset: number, limit: number) => {
  try {
    const books = await Book.findAndCountAll({
      offset,
      limit,
      where: {
        available: true
      }
    });
    return { books: books.rows, count: books.count };
  } catch (error) {
    if (error instanceof Error) {
      return { error: new HttpException(500, error.message) };
    }
  }
};

const getBook = async (id: number) => {
  try {
    const book = await Book.findByPk(id);
    return book;
  } catch (error) {
    if (error instanceof Error) {
      return new HttpException(500, error.message);
    }
  }
};

const addBook = async (book: BookAttributes) => {
  try {
    const newBook = await Book.create(book);
    return newBook;
  } catch (error) {
    if (error instanceof Error) {
      return new HttpException(500, error.message);
    }
  }
};

const updateBook = async (id: number, book: BookAttributes) => {
  try {
    const updateBook = await Book.update(book, {
      where: {
        id
      }
    });
    return updateBook;
  } catch (error) {
    if (error instanceof Error) {
      return new HttpException(500, error.message);
    }
  }
};

const rentBook = async (id: number, userId: number) => {
  try {
    const rentBook = await Book.update(
      {
        available: false,
        userId
      },
      {
        where: {
          id
        }
      }
    );
    return rentBook;
  } catch (error) {
    if (error instanceof Error) {
      return new ServerException();
    }
  }
};

const returnBook = async (id: number) => {
  try {
    const returnBook = await Book.update(
      {
        available: true,
        userId: null
      },
      {
        where: {
          id
        }
      }
    );
    return returnBook;
  } catch (error) {
    if (error instanceof Error) {
      return new ServerException();
    }
  }
};

const deleteBook = async (id: number) => {
  try {
    const deleteBook = await Book.destroy({
      where: {
        id
      }
    });
    return deleteBook;
  } catch (error) {
    if (error instanceof Error) {
      return new HttpException(500, error.message);
    }
  }
};

export default {
  getAllBooks,
  getAllAvailableBooks,
  getBook,
  addBook,
  updateBook,
  rentBook,
  returnBook,
  deleteBook
};
