import { NextFunction, Request, Response } from 'express';
import {
  NotFoundException,
  NotFoundByIdException,
  HttpException
} from '../errors';

import bookService from '../services/bookService';
import { BookUpdateAttributes } from '../types/book';

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  const allBooks = await bookService.getAllBooks();
  if (!allBooks) next(new NotFoundException('Books'));
  if (allBooks instanceof HttpException) return next(allBooks);

  res.send({ status: 'OK', data: allBooks });
};

const getAllAvailableBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const getAllAvailableBooks = await bookService.getAllAvailableBooks();
  if (!getAllAvailableBooks) next(new NotFoundException('Books'));
  if (getAllAvailableBooks instanceof HttpException) {
    return next(getAllAvailableBooks);
  }

  res.send(getAllAvailableBooks);
};

const getBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const getBook = await bookService.getBook(Number(id));
  if (!getBook) return next(new NotFoundByIdException(id, 'Book'));
  if (getBook instanceof HttpException) return next(getBook);

  res.send({ status: 'OK', data: getBook });
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
  getBook,
  addBook,
  updateBook,
  rentBook,
  returnBook,
  deleteBook
};
