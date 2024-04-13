import express from 'express';
import path from 'path';
import { getHTML, getCSS, getJavaScript, getImage, get404, get500 } from './functions.js';

const app = express();

// Serve static files from the 'public' directory, only for specific routes
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Root route: Serve the HTML file from the root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// You can also use the getHTML() if it returns the HTML file content
// app.get('/', (req, res) => {
//   res.send(getHTML());
// });

// CSS route: Respond with the CSS file
app.get('/style.css', (req, res) => {
  res.send(getCSS());
});

// JavaScript route: Respond with the JavaScript file
app.get('/main.js', (req, res) => {
  res.send(getJavaScript());
});

// Image route: Respond with the image file
app.get('/image.jpg', (req, res) => {
  res.send(getImage());
});

// Catch-all for 404 Not Found responses
app.get('*', (req, res) => {
  res.send(get404());
});

// Error handling middleware for 500 Internal Server Errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack to console
  res.status(500).send(get500());
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Export the app for potential testing or further module integration
export default app;
