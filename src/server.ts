import 'dotenv/config';
import App from './app';

import checkRequiredEnvVars from './utils/checkRequiredEnvVars';

checkRequiredEnvVars(['JWT_SECRET']);

const app = new App();

app.listen();
