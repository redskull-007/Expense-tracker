const Expense = require('../models/expenseModel');

const ExpenseController = {
  addExpense: async (req, res) => {
    const { amount, description, category } = req.body;

    try {
      const newExpense = await Expense.create({ amount, description, category });
      res.status(200).json({ message: 'Expense added successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getExpenses: async (req, res) => {
    try {
      const expenses = await Expense.findAll();
      res.status(200).json(expenses);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Add other expense-related functions as needed
};

module.exports = ExpenseController;
