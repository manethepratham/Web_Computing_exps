// Import express
import express from 'express';
import pageRouter from './route.js';
import apiRouter from './rest.js';

// Create an app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use the page router for top-level paths
app.use('/', pageRouter); 

// Use the API router for paths starting with /
app.use('/', apiRouter);

// Define a root route
app.get('/', (req, res) => {
  res.send('Hello, welcome to Express.js!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
