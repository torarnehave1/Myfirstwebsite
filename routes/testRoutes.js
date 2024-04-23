import express from 'express';
import db from '../db/db.js'; // Assuming you have a db.js file for database connection
import dotenv from 'dotenv';
import User from '../models/user.js';
  

dotenv.config();


const router = express.Router();


router.get('/test-env', (req, res) => {
  
    const dbHost = process.env.DUMMY_DB_HOST;
    const env = process.env.DUMMY_ENV;
  
    if (!dbHost || !env) {
      return res.status(500).send('Unable to read .env variables');
    }
  
    res.send(`DUMMY_DB_HOST is ${dbHost} and DUMMY_ENV is ${env}`);
  });
  
  
 
  
  router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.render('users', { users });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
 
  
  
  router.get('/usrs', async (req, res) => {
    try {
      await db.getConnection();  // Ensure database connection
      const [users] = await db.execute('SELECT * FROM users');  // Fetch users
  
      res.json({ status: 'Connected', users: users });
      console.log('Fetched users:', users);
  
    } catch (error) {
      console.error('Error:', error);
      const message = error.code === 'ECONNREFUSED' ? 'Database connection refused' : 'Internal server error';
      
      res.status(500).json({ status: 'Error', error: message });
    }
  });
  
  router.get('/test-db', async (req, res) => {
   
    db.getConnection().then(() => { 
      console.log('Connected to database');
      res.send('Connected to database TAH');
    }).catch((error) => {
      console.error('Error connecting to database:', error);
      res.status(500).send('Error connecting to database TAH');
    });
    
  });
  
  
  router.get('/hel', (req, res) => {
    res.send('Hello HEL');
    console.log('TAH');
  });
  
  router.get('/hello', (req, res) => {
    res.send('Hello');
  });
  
  router.get('/concat', (req, res) => {
    const { ID, Name } = req.query;
  
    // Check if ID and Name are provided and ID is a number
    if (!ID || !Name || isNaN(ID)) {
      return res.status(400).send({ error: 'Invalid parameters' });
    }
  
    const result = `${ID}${Name}`;
    
    console.log(JSON.stringify({ result }));
  
    res.send(result);c
  });
  
  export default router;
