import express from 'express';
import bodyParser from 'body-parser';

import { runPuppeteer } from './puppeteerRunner';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', runPuppeteer);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server Started`);
});
