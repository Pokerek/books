import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(name: string) {
    super(404, `${name} not found.`);
  }
}

export default NotFoundException;
