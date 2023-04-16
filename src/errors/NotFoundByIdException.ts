import HttpException from './HttpException';

class NotFoundByIdException extends HttpException {
  constructor(id: string, name: string) {
    super(404, `${name} with id: ${id} not found.`);
  }
}

export default NotFoundByIdException;
