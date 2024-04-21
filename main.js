import express from 'express';
import path from 'path';
import db from './db/db.js'; // Make sure the path to your db config is correct
import { getHTML, getCSS, getJavaScript, getImage, get404, get500 } from './functions.js';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import testRoutes from './routes/testRoutes.js';



dotenv.config();

console.log('Environment Variables:', process.env);


const app = express();
app.use(cors()); // This enables CORS for all routes and all origins

app.use('/t', testRoutes); //  ./t for tests routes

db.getConnection().then(() => { 
  console.log('Connected to database');
}).catch((error) => {
  console.error('Error connecting to database:', error);
});

const PORT = process.env.PORT || 3000;
 

// app.get('/api/users', async (req, res) => {
//   console.log('Reached /api/users route');
//   // Hardcoded test data for users with IDs 1 and 2
//   res.json([
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' }
//   ]);
// });



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/css/style.css', (req, res) => {
  res.send(getCSS());
});

app.get('/main.js', (req, res) => {
  res.send(getJavaScript());
});

app.get('/image.jpg', (req, res) => {
  res.send(getImage());
});

app.get('*', (req, res) => {
  res.send(get404());
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(get500());
});

export default app;
