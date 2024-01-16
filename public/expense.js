// public/js/expense.js
async function addExpense() {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
  
    try {
      const response = await fetch('http://localhost:3000/expense/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, description, category }),
      });
  
      if (response.ok) {
        alert('Expense added successfully!');
        fetchExpenses();
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function fetchExpenses() {
    try {
      const response = await fetch('http://localhost:3000/expense/getExpenses');
  
      if (response.ok) {
        const expenses = await response.json();
        displayExpenses(expenses);
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayExpenses(expenses) {
    const expensesList = document.getElementById('expenses');
    expensesList.innerHTML = '';
  
    expenses.forEach(expense => {
      const listItem = document.createElement('li');
      listItem.textContent = `Amount: $${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`;
      expensesList.appendChild(listItem);
    });
  }
  
  // Fetch expenses on page load
  fetchExpenses();
  