// server.js
import express from 'express';
import { ViteExpress } from 'vite-plugin-node/dist/plugin';

const app = express();

app.get('/api/message', (_, res) => {
  res.send('Hello from Express!');
});

ViteExpress.listen(app, 3000, () => {
  console.log('Server is listening on port 3000');
});
