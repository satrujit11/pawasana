import { handler } from './build/handler.js';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

app.use(handler);

const port = 80;
const host = '0.0.0.0'

app.listen(port, host, () => {
  console.log(`listening on port ${port}`);
});

