// server.js
const express = require('express');
const path = require('path');
const sequelize = require('./utils/database');
const UserController = require('./controllers/userController');

const app = express();
const port = 3000;

// Sync the models with the database
sequelize.sync();

// Express middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle root path
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Route to handle login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// API endpoint for user signup
app.post('/signup', UserController.signup);

// API endpoint for user login
app.post('/login', UserController.login);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
