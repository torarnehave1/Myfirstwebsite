import express from 'express';
import path from 'path';
import db from './src/server/db.js'; // Make sure the path to your db config is correct
import { getHTML, getCSS, getJavaScript, getImage, get404, get500 } from './functions.js';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

console.log('Environment Variables:', process.env);


const app = express();
app.use(cors()); // This enables CORS for all routes and all origins


db.getConnection().then(() => { 
  console.log('Connected to database');
}).catch((error) => {
  console.error('Error connecting to database:', error);
});

const PORT = process.env.PORT || 3000;
 

app.get('/test-env', (req, res) => {
  
  const dbHost = process.env.DUMMY_DB_HOST;
  const env = process.env.DUMMY_ENV;

  if (!dbHost || !env) {
    return res.status(500).send('Unable to read .env variables');
  }

  res.send(`DUMMY_DB_HOST is ${dbHost} and DUMMY_ENV is ${env}`);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/api/users', async (req, res) => {
  try {
    await db.getConnection();  // Ensure database connection
    const [users] = await db.execute('SELECT * FROM users');  // Fetch users

    res.json({ status: 'Connected', users: users });
  } catch (error) {
    console.error('Error:', error);
    const message = error.code === 'ECONNREFUSED' ? 'Database connection refused' : 'Internal server error';
    
    res.status(500).json({ status: 'Error', error: message });
  }
});

app.get('/api/test-db', async (req, res) => {
 
  db.getConnection().then(() => { 
    console.log('Connected to database');
    res.send('Connected to database TAH');
  }).catch((error) => {
    console.error('Error connecting to database:', error);
    res.status(500).send('Error connecting to database TAH');
  });
  
});


app.get('/hel', (req, res) => {
  res.send('Hello');
});

app.get('/hello', (req, res) => {
  res.send('Hello');
});

app.get('/concat', (req, res) => {
  const { ID, Name } = req.query;

  // Check if ID and Name are provided and ID is a number
  if (!ID || !Name || isNaN(ID)) {
    return res.status(400).send({ error: 'Invalid parameters' });
  }

  const result = `${ID}${Name}`;
  
  //console.log(JSON.stringify({ result }));

  res.send(result);
});

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
