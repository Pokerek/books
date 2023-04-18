import { Router } from 'express';
const router = Router();

import bookController from '../controllers/bookController';
import validationMiddleware from '../middlewares/validation.middleware';
import {
  bookAddSchema,
  bookForRentSchema,
  bookUpdateSchema
} from '../validations/book';

router.get('/', bookController.getAllBooks);

router.get('/available', bookController.getAllAvailableBooks);

router.get('/:id', bookController.getBook);

router.post('/', validationMiddleware(bookAddSchema), bookController.addBook);

router.patch(
  '/:id',
  validationMiddleware(bookUpdateSchema),
  bookController.updateBook
);

router.patch(
  '/rent/:id',
  validationMiddleware(bookForRentSchema),
  bookController.rentBook
);
router.patch(
  '/return/:id',
  validationMiddleware(bookForRentSchema),
  bookController.returnBook
);

router.delete('/:id', bookController.deleteBook);

export default { path: '/books', router };
