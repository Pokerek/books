import { Router } from 'express';
const router = Router();

import bookController from '../controllers/bookController';

router.get('/', bookController.getAllBooks);

router.get('/available', bookController.getAllAvailableBooks);

router.get('/:id', bookController.getBook);

router.post('/', bookController.addBook);

router.put('/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

export default { path: '/books', router };
