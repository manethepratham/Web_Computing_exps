
import express from 'express';
import path from 'path';

const router = express.Router();

// Serve the about page
router.get('/about', (req, res) => {
  res.sendFile(path.resolve('public/about.html'));
});

// Serve the contact page
router.get('/contact', (req, res) => {
  res.sendFile(path.resolve('public/contact.html'));
});

export default router;
