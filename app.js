const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Set up Sequelize with MySQL
const sequelize = new Sequelize('expenses', 'root', 'abhi@mysql100', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync();

// Express middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// Route to handle root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// API endpoint for user signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user
    const newUser = await User.create({ name, email, password });

    res.status(201).json({ message: 'User signed up successfully.', user: newUser });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
