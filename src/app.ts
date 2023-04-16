import express from 'express';
import { join } from 'path';
import cors from 'cors';

import errorMiddleware from './middlewares/error';
import routers from './routes';
import { connectDB } from './database';

const PORT = Number(process.env.PORT) || 3000;

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddleware();
    this.initializeErrorHandler();
    this.initializeRoutes();
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

  private initializeRoutes() {
    for (const router of routers) {
      const { path, router: routerInstance } = router;
      this.app.use(`/api${path}`, routerInstance);
    }
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }

  private connectToTheDatabase() {
    connectDB();
  }
}

export default App;
