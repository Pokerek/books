import { Request, Response } from 'express';
import { NotFoundException, NotFoundByIdException } from '../errors';

import bookService from '../services/bookService';

const getAllBooks = async (req: Request, res: Response) => {
  const allBooks = await bookService.getAllBooks();
  if (!allBooks) throw new NotFoundException('Books');

  res.send({ status: 'OK', data: allBooks });
};

const getAllAvailableBooks = async (req: Request, res: Response) => {
  const getAllAvailableBooks = await bookService.getAllAvailableBooks();
  if (!getAllAvailableBooks) throw new NotFoundException('Books');

  res.send(getAllAvailableBooks);
};

const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  const getBook = await bookService.getBook(Number(id));
  if (!getBook) throw new NotFoundByIdException(id, 'Book');

  res.send({ status: 'OK', data: getBook });
};

const addBook = async (req: Request, res: Response) => {
  const { title, author, isbn } = req.body;
  const book = { title, author, isbn };

  const addBook = await bookService.addBook(book);
  if (!addBook) throw new NotFoundException('Book');

  res.send({ status: 'OK', data: addBook });
};

const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, isbn } = req.body;
  const book = { title, author, isbn };

  const updateBook = await bookService.updateBook(Number(id), book);
  if (!updateBook) throw new NotFoundByIdException(id, 'Book');

  res.send({ status: 'OK', data: book });
};

const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteBook = await bookService.deleteBook(Number(id));
  if (!deleteBook) throw new NotFoundByIdException(id, 'Book');

  res.send({ status: 'OK', message: `Book with id ${id} was deleted.` });
};

export default {
  getAllBooks,
  getAllAvailableBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
};
