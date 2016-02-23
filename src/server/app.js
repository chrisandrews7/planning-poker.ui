import config from 'config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import indexRoutes from './controllers/index';

const app = express();

// Logging
if (config.get('features.logging')) {
  app.use(morgan('combined'));
}

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Security
app.use(helmet());

// Views
app.use(express.static(`${__dirname}/../client`));

// Routes
app.use(indexRoutes);

export default app;
