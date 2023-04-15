import { Request, Response } from 'express';

import bookService from '../services/bookService';

const getAllBooks = async (req: Request, res: Response) => {
  const allBooks = bookService.getAllBooks();
  res.send({ status: 'success', data: allBooks });
};

const getAllAvailableBooks = async (req: Request, res: Response) => {
  const getAllAvailableBooks = bookService.getAllAvailableBooks();
  res.send(getAllAvailableBooks);
};

const getBook = async (req: Request, res: Response) => {
  const book = bookService.getBook();
  res.send(book);
};

const addBook = async (req: Request, res: Response) => {
  const addBook = bookService.addBook();
  res.send(addBook);
};

const updateBook = async (req: Request, res: Response) => {
  const updateBook = bookService.updateBook();
  res.send(updateBook);
};

const deleteBook = async (req: Request, res: Response) => {
  const deleteBook = bookService.deleteBook();
  res.send(deleteBook);
};

export default {
  getAllBooks,
  getAllAvailableBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
};
