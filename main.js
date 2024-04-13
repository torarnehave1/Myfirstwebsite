import express from 'express';
import path from 'path';
import { getHTML, getCSS, getJavaScript, getImage, get404, get500 } from './functions.js';
import { fileURLToPath } from 'url'; // Import the function from 'url' module


const app = express();
const __filename = fileURLToPath(import.meta.url); // Get the file path from the URL
const __dirname = path.dirname(__filename); // Get the directory name from the file pa
// Serve static files from the 'public' directory, only for specific routes
//app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use("/", express.static(__dirname));

app.use('/public', express.static(__dirname + '/public'));


// Root route: Serve the HTML file from the root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  //res.sendFile(__dirname + '/public/index/index.html');
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
