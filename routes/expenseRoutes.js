// routes/expenseRoutes.js
const express = require('express');
const path = require('path');
const ExpenseController = require('../controllers/expenseController');

const router = express.Router();

// Route to handle adding an expense
router.post('/addExpense', ExpenseController.addExpense);

// Route to handle fetching expenses
router.get('/getExpenses', ExpenseController.getExpenses);

// Route to handle expense form
router.get('/addExpense', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'expense.html'));
});

router.delete('/deleteexpense/:id', ExpenseController.deleteExpense);

module.exports = router;
