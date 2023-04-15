import 'dotenv/config';
import App from './app';

import checkRequiredEnvVars from './utils/checkRequiredEnvVars';

checkRequiredEnvVars([
  'DB_USER',
  'DB_PASSWORD',
  'DB_HOST',
  'DB_PORT',
  'DB_DATABASE'
]);

const app = new App();

app.listen();
