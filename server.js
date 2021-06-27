import express from 'express';
import { Mongoose } from 'mongoose';

import { APP_PORT, DB_URL } from './config';
import errorHandler from './middlewares/errorHandler';

import routes from './routes/index';

// import registerController from './controllers/registerController';

const app = express();

import mongoose from 'mongoose';

// db connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('DB connected...');
})


app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(APP_PORT, () => console.log(`server is running on ${APP_PORT}.`));