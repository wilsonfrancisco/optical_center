import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { appendDataToExcel } from './data-appender.js';

const app = express();
const port = 3000;

app.use(cors({ origin: '*'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/submit-form', (req, res) => {
  const formData = req.body;
  const data = JSON.parse(JSON.stringify(formData, null, 2))
  console.log('Form Data Received:', JSON.stringify(formData, null, 2));

  // Append form data to Excel file
  // appendDataToExcel(); 
  res.json({ message: 'Form data received successfully!', data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});