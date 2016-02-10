import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.sendfile(`${__dirname}/../client/index.html`);
});

export default app;
