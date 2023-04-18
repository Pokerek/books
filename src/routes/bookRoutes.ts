import { Router } from 'express';
const router = Router();

import bookController from '../controllers/bookController';
import validationMiddleware from '../middlewares/validation.middleware';
import { bookAddSchema, bookUpdateSchema } from '../validations/book';
import authMiddleware, {
  adminMiddleware,
  userMiddleware
} from '../middlewares/auth.middleware';

router.get('/', authMiddleware, bookController.getAllBooks);

router.get('/available', authMiddleware, bookController.getAllAvailableBooks);

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(bookAddSchema),
  bookController.addBook
);

router.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(bookUpdateSchema),
  bookController.updateBook
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  bookController.deleteBook
);

router.patch(
  '/rent/:id',
  authMiddleware,
  userMiddleware,
  bookController.rentBook
);
router.patch(
  '/return/:id',
  authMiddleware,
  userMiddleware,
  bookController.returnBook
);

export default { path: '/books', router };
