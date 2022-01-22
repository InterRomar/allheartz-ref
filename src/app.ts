import express, { Request } from 'express';
import bodyParser from 'body-parser';

import cors from 'middlewares/cors';
import readDeviceId from 'middlewares/readDeviceId';
// import types from 'types';

// import errorHandler from 'middlewares/errorHandler';

import setRoutes from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(__dirname));
app.use(cors);
app.use(readDeviceId);

setRoutes(app);

app.get('/', (req: Request, res) => {
  res.json('Hello World');
});

// app.use(errorHandler);

export default app;
