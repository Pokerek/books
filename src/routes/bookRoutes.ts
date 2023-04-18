import { Router } from 'express';
const router = Router();

import apicache from 'apicache';
const cache = apicache.middleware;

import bookController from '../controllers/bookController';
import validationMiddleware from '../middlewares/validation.middleware';
import { bookAddSchema, bookUpdateSchema } from '../validations/book';
import authMiddleware, {
  adminMiddleware,
  userMiddleware
} from '../middlewares/auth.middleware';

router.use(authMiddleware);

router.get('/', cache('2 minutes'), bookController.getAllBooks);

router.get(
  '/available',
  cache('2 minutes'),
  bookController.getAllAvailableBooks
);

router.post(
  '/',
  adminMiddleware,
  validationMiddleware(bookAddSchema),
  bookController.addBook
);

router.patch(
  '/:id',
  adminMiddleware,
  validationMiddleware(bookUpdateSchema),
  bookController.updateBook
);

router.delete('/:id', adminMiddleware, bookController.deleteBook);

router.patch('/rent/:id', userMiddleware, bookController.rentBook);
router.patch('/return/:id', userMiddleware, bookController.returnBook);

export default { path: '/books', router };
