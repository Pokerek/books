import { NextFunction, Request, Response } from 'express';
import {
  NotFoundException,
  NotFoundByIdException,
  HttpException
} from '../errors';

import bookService from '../services/bookService';
import { BookAttributes, BookUpdateAttributes } from '../types/book';

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;

  const offset = (page - 1) * limit;

  const data = await bookService.getAllBooks(offset, limit);
  if (data?.error) return next(data.error);

  if (!data) return next(new NotFoundException('Books'));

  const totalPage = Math.ceil(data.count / limit);
  const convertedBooks = data.books.map((book: BookAttributes) => {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      available: book.available
    };
  });

  res.send({
    status: 'OK',
    total: data.count,
    page,
    totalPage,
    limit,
    data: convertedBooks
  });
};

const getAllAvailableBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;

  const offset = (page - 1) * limit;

  const data = await bookService.getAllAvailableBooks(offset, limit);
  if (data?.error) return next(data.error);
  if (!data) return next(new NotFoundException('Books'));

  const totalPage = Math.ceil(data.count / limit);
  const convertedBooks = data.books.map((book: BookAttributes) => {
    return {
      id: book.id,
      title: book.title,
      author: book.author
    };
  });

  res.send({
    status: 'OK',
    total: data.count,
    page,
    totalPage,
    limit,
    data: convertedBooks
  });
};

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, isbn } = req.body;
  const book = { title, author, isbn };

  const addBook = await bookService.addBook(book);
  if (!addBook) return next(new NotFoundException('Book'));
  if (addBook instanceof HttpException) return next(addBook);

  res.send({ status: 'OK', data: addBook });
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const book = req.body as BookUpdateAttributes;

  if (Object.keys(book).length === 0)
    return next(new HttpException(400, 'Bad request'));

  const updateBook = await bookService.updateBook(Number(id), book);
  if (!updateBook) return next(new NotFoundByIdException(id, 'Book'));
  if (updateBook instanceof HttpException) return next(updateBook);

  res.send({
    status: 'OK',
    message: `Book with id ${id} was updated.`
  });
};

const rentBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { userId } = req.body;

  const book = await bookService.getBook(Number(id));
  if (!book) return next(new NotFoundByIdException(id, 'Book'));
  if (book instanceof HttpException) return next(book);

  if (book.userId === userId) {
    return next(
      new HttpException(400, `You already rented book with id ${id}.`)
    );
  }

  if (!book.available) {
    return next(
      new HttpException(400, `Book with id ${id} is not available for rent.`)
    );
  }

  const rentBook = await bookService.rentBook(Number(id), Number(userId));
  if (!rentBook) return next(new NotFoundByIdException(id, 'Book'));

  res.send({ status: 'OK', message: `Book with id ${id} was rented.` });
};

const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { userId } = req.body;

  const book = await bookService.getBook(Number(id));
  if (!book) return next(new NotFoundByIdException(id, 'Book'));
  if (book instanceof HttpException) return next(book);

  if (book.available && book.userId !== userId) {
    return next(
      new HttpException(400, `Book with id ${id} is not rented by you.`)
    );
  }

  const returnBook = await bookService.returnBook(Number(id));
  if (!returnBook) return next(new NotFoundByIdException(id, 'Book'));
  if (returnBook instanceof HttpException) return next(returnBook);

  res.send({ status: 'OK', message: `Book with id ${id} was returned.` });
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const deleteBook = await bookService.deleteBook(Number(id));
  if (!deleteBook) return next(new NotFoundByIdException(id, 'Book'));
  if (deleteBook instanceof HttpException) return next(deleteBook);

  res.send({ status: 'OK', message: `Book with id ${id} was deleted.` });
};

export default {
  getAllBooks,
  getAllAvailableBooks,
  addBook,
  updateBook,
  rentBook,
  returnBook,
  deleteBook
};
