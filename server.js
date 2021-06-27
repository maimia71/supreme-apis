import express from 'express';

import { APP_PORT } from './config';

import routes from './routes/index';

import registerController from './controllers/registerController'

const app = express();

app.use('/api', routes);

app.listen(APP_PORT, registerController.register);