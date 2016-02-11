import config from 'config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

if (config.get('features.logging')) {
  app.use(morgan('combined'));
}

app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello');
});

export default app;
