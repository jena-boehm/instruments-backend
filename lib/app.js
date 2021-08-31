import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import instrumentsController from './controllers/instruments.js';

const app = express();

app.use(express.json());

app.use('/', instrumentsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
