import 'module-alias/register';

import app from './app';
import connectDb from './db/connect';

process.on('unhandledRejection', (reason, p) => {
  console.error('🚧 UnhandledPromiseRejectionWarning: Unhandled promise rejection 🚧', reason, p);
});

connectDb().then(() => {
  app.listen(4000, () => {
    console.log('hell0');
  });
}).catch((err) => console.log(err));

app.on('error', (err) => {
  console.error('Error starting the server: ', err);
});
