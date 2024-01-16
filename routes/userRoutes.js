// routes/userRoutes.js
const express = require('express');
const path = require('path');
const UserController = require('../controllers/userController');

const router = express.Router();

// Route to handle user signup
router.post('/signup', UserController.signup);

// Route to handle user login
router.post('/login', UserController.login);

// Route to handle login page
router.get('/login', (req, res) => {
 res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

// Route to handle signup page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
});

router.get('/addexpense', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'expense.html'));
});


module.exports = router;
