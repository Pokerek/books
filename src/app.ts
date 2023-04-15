import express from 'express';
import { join } from 'path';
import cors from 'cors';

import Controller from './types/controller';
import errorMiddleware from './middlewares/error';

const PORT = Number(process.env.PORT) || 3000;

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandler();
  }

  public listen() {
    this.app.listen(PORT, () => {
      console.log(`App listening on the port ${PORT}`);
    });
  }

  private initializeMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/public', express.static(join(__dirname, '../public')));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }

  // TODO Change for relational database
  private connectToTheDatabase() {
    console.log('Database');
  }
}

export default App;
