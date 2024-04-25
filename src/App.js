import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import './App.css'; // Import CSS file for styling

const App = () => {
  const [expensesByMonth, setExpensesByMonth] = useState({});

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expensesByMonth'));
    if (storedExpenses) {
      setExpensesByMonth(storedExpenses);
    }
  }, []);

  const addExpense = (expense) => {
    const { month, salary } = expense;
    const updatedExpensesByMonth = { ...expensesByMonth };
    if (updatedExpensesByMonth[month]) {
      updatedExpensesByMonth[month].push(expense);
    } else {
      updatedExpensesByMonth[month] = [expense];
    }
    if (!updatedExpensesByMonth[month].hasOwnProperty('salary')) {
      updatedExpensesByMonth[month].salary = salary;
    }
    setExpensesByMonth(updatedExpensesByMonth);
  };

  useEffect(() => {
    localStorage.setItem('expensesByMonth', JSON.stringify(expensesByMonth));
  }, [expensesByMonth]);

  const deleteExpense = (month, index) => {
    const updatedExpensesByMonth = { ...expensesByMonth };
    updatedExpensesByMonth[month].splice(index, 1);
    setExpensesByMonth(updatedExpensesByMonth);
  };

  const calculateSaving = (month) => {
    const totalExpenses = expensesByMonth[month].reduce((acc, expense) => acc + expense.expenseAmount, 0);
    const totalSalary = parseFloat(localStorage.getItem(`${month}-salary`));
    const savingAmount = totalSalary - totalExpenses;
    return savingAmount >= 0 ? savingAmount : 0;
  };

  const calculateTotalSaving = () => {
    let totalSaving = 0;
    Object.entries(expensesByMonth).forEach(([month, expenses]) => {
      const totalExpenses = expenses.reduce((acc, expense) => acc + expense.expenseAmount, 0);
      const totalSalary = parseFloat(localStorage.getItem(`${month}-salary`));
      totalSaving += totalSalary - totalExpenses;
    });
    return totalSaving >= 0 ? totalSaving : 0;
  };

  const generateRandomColor = () => {
    const colors = ['#34568B', '#FF6F61', '#6B5B95', '#88B04B', '#C3447A', '#955251', '#B565A7', '#DD4124', '#009B77'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className='App'>
      <h1 className='heading'>Kharcha Tracker</h1>
      <div className="container">
        <div className="form-container">
          {/* <h1>Expense Tracker</h1> */}
          <ExpenseForm addExpense={addExpense} />
        </div>
        <div className="expenses-container">
          <h2 className='heading'>Month wise Expenses</h2>
          {Object.entries(expensesByMonth).map(([month, expenses]) => (
            <div className='box' key={month} style={{ backgroundColor: generateRandomColor() }}>
              <div className='box-content'>
                <h3 className='month'>{month}</h3>
                <p>Salary: {parseFloat(localStorage.getItem(`${month}-salary`)) || 0}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Expense Reason</th>
                      <th>Expense Amount</th>
                      <th>Description</th>
                      <th>Action</th> {/* Add Action column */}
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense, index) => (
                      <tr key={index}>
                        <td>{expense.date}</td>
                        <td>{expense.expenseReason}</td>
                        <td>{expense.expenseAmount}</td>
                        <td>{expense.description}</td>
                        <td>
                          <button className='del' onClick={() => deleteExpense(month, index)}>Delete</button> {/* Delete button */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p>Saving Amount: {calculateSaving(month)}</p>
              </div>
            </div>
          ))}
          <h3 className={calculateTotalSaving() < 10000 ? "blinker" : ""}>Total Saving from all months: {calculateTotalSaving()}</h3>
        </div>
      </div>
    </div>
  );
};

export default App;
