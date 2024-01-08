import { handler } from './build/handler.js';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

app.use(handler);

const PORT = 3000;
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`Listening on port ${PORT}`);
});

