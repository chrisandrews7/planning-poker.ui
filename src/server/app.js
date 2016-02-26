import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import indexRoutes from './controllers/index';

const app = express();

// Body Parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// Security
// app.use(helmet());

// Views
app.use(express.static(`${__dirname}/../client`));

// Routes
app.use(indexRoutes);

export default app;
