// public/expense.js
async function loadExpenses() {
  // Make a fetch request to get the user's expenses
  try {
    const response = await fetch('http://localhost:3000/expenses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      const expenseTableBody = document.getElementById('expenseTableBody');

      // Clear previous entries
      expenseTableBody.innerHTML = '';

      // Display each expense in the table
      data.expenses.forEach((expense) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${expense.description}</td>
          <td>${expense.amount}</td>
          <td>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
          </td>
        `;
        expenseTableBody.appendChild(row);
      });
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteExpense(expenseId) {
  try {
    const response = await fetch(`http://localhost:3000/deleteexpense/${expenseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      alert('Expense deleted successfully!');
      // Reload expenses after deletion
      loadExpenses();
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Load expenses when the page loads
loadExpenses();
