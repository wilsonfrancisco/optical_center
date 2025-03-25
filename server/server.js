import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { appendDataToExcel } from './utils/data-appender.js';
import { initializeDb } from './providers/db.js';

const app = express();
const port = 3000;

app.use(cors({ origin: '*'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

initializeDb().catch(console.error);

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit-form', (req, res) => {
  const formData = req.body;
  const data = JSON.parse(JSON.stringify(formData, null, 2))

  appendDataToExcel(data).catch(console.error);
  res.json({ message: 'Form data received successfully!', data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
