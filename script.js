document.addEventListener('DOMContentLoaded', loadExpenses);
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const editForm = document.getElementById('edit-form');
const editExpenseName = document.getElementById('edit-expense-name');
const editExpenseAmount = document.getElementById('edit-expense-amount');
const saveEdit = document.getElementById('save-edit');

let expenses = [];
let editIndex = null;

// Load expenses from local storage
function loadExpenses() {
    expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    renderExpenses();
}

// Render expenses to the list
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name}: $${expense.amount}
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

// Add expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    
    if (editIndex !== null) {
        expenses[editIndex] = { name, amount };
        editIndex = null;
    } else {
        expenses.push({ name, amount });
    }
    
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    expenseForm.reset();
});

// Edit expense
function editExpense(index) {
    editIndex = index;
    const expense = expenses[index];
    editExpenseName.value = expense.name;
    editExpenseAmount.value = expense.amount;
    editForm.style.display = 'flex';
}

// Save edited expense
saveEdit.addEventListener('click', () => {
    expenses[editIndex] = {
        name: editExpenseName.value,
        amount: editExpenseAmount.value
    };
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    editForm.style.display = 'none';
    editExpenseName.value = '';
    editExpenseAmount.value = '';
    editIndex = null;
});

// Delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}
