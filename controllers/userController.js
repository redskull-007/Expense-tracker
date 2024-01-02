const User = require('../models/userModel');

const UserController = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      const newUser = await User.create({ name, email, password });

      res.status(201).json({ message: 'User signed up successfully.', user: newUser });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  },
};

module.exports = UserController;
