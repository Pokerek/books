import { models } from '../database';
import HttpException from '../errors/HttpException';
import { BookAttributes } from '../types/Book';

const Book = models.Book;

const getAllBooks = async () => {
  try {
    const books = await Book.findAll();
    return books;
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpException(500, error.message);
    }
  }
};

const getAllAvailableBooks = async () => {
  try {
    const books = await Book.findAll({
      where: {
        available: true
      }
    });
    return books;
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpException(500, error.message);
    }
  }
};

const getBook = async (id: number) => {
  try {
    const book = await Book.findByPk(id);
    return book;
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpException(500, error.message);
    }
  }
};

const addBook = async (book: BookAttributes) => {
  try {
    const newBook = await Book.create(book);
    return newBook;
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpException(500, error.message);
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
      throw new HttpException(500, error.message);
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
      throw new HttpException(500, error.message);
    }
  }
};

export default {
  getAllBooks,
  getAllAvailableBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
};
