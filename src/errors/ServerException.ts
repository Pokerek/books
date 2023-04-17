import HttpException from './HttpException';

class ServerException extends HttpException {
  constructor() {
    super(500, 'Internal server error.');
  }
}

export default ServerException;
