import { Router } from 'express';
const router = Router();

import bookController from '../controllers/bookController';
import validationMiddleware from '../middlewares/validation.middleware';
import { bookAddSchema, bookUpdateSchema } from '../validations/book';

router.get('/', bookController.getAllBooks);

router.get('/available', bookController.getAllAvailableBooks);

router.get('/:id', bookController.getBook);

router.post('/', validationMiddleware(bookAddSchema), bookController.addBook);

router.put(
  '/:id',
  validationMiddleware(bookUpdateSchema),
  bookController.updateBook
);

router.delete('/:id', bookController.deleteBook);

export default { path: '/books', router };
