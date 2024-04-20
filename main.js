import express from 'express';
import path from 'path';
import db from './src/server/db.js'; // Make sure the path to your db config is correct
import { getHTML, getCSS, getJavaScript, getImage, get404, get500 } from './functions.js';
import { fileURLToPath } from 'url';

import cors from 'cors';

const app = express();
app.use(cors()); // This enables CORS for all routes and all origins

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', (req, res) => {
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

// Check database connection and log all users
db.getConnection()
  .then(() => {
    console.log('Connected to the database successfully');
    logUsers(); // Call the function to log all users
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

async function logUsers() {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        console.log('All users:', users);
    } catch (error) {
        console.error('Error retrieving users:', error);
    }
}


app.get('/api/users', async (req, res) => {
  
  

  app.get('/api/users', async (req, res) => {
    try {
      console.log('Reached /api/users route');
      const [rows] = await db.execute('SELECT * FROM users');
      res.setHeader('Content-Type', 'application/json');
      res.json(rows);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.post('/api/log-error', (req, res) => {
  console.log('Error received:', req.body);
  // Add any logging mechanism here, e.g., writing to a file or database
  res.status(200).json({ message: 'Error logged successfully' });
});


export default app;
