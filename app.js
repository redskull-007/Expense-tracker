const express = require('express');
const path = require('path');
const sequelize = require('./utils/database');

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const port = 3000;

// Sync the models with the database
sequelize.sync();

// Express middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/public',express.static(path.join(__dirname, 'public')));

// Use userRoutes for user-related routes
app.use('/user', userRoutes);

// Use expenseRoutes for expense-related routes
app.use('/expense', expenseRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
