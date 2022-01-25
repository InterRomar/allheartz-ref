import 'module-alias/register';

import config from 'config';

import app from './app';
import connectDb from './db/connect';

process.on('unhandledRejection', (reason, p) => {
  console.error('🚧 UnhandledPromiseRejectionWarning: Unhandled promise rejection 🚧', reason, p);
});

connectDb().then(() => {
  app.listen(config.port, () => {
    console.log(`Server has been started on port: ${config.port}`);
  });
}).catch((err) => console.log(err));

app.on('error', (err) => {
  console.error('Error starting the server: ', err);
});
