// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const UserController = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      // Use bcrypt to hash the password before saving to the database
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({ message: 'User signed up successfully.', user: newUser });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        // Use bcrypt to compare the stored hashed password with the input password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          res.status(200).json({ message: 'User logged in successfully.' });
        } else {
          res.status(401).json({ message: 'Invalid email or password.' });
        }
      } else {
        res.status(404).json({ message: 'User Doesnot Exist.' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  },
};

module.exports = UserController;
