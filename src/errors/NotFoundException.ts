import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(id: string, name: string) {
    super(404, `${name} with id: ${id} not found.`);
  }
}

export default NotFoundException;
