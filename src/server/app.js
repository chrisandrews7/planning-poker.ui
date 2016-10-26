import express from 'express';
import helmet from 'helmet';

const app = express();

// Security
app.use(helmet());

// Views
app.use('/', express.static(`${__dirname}/../client`));

export default app;
