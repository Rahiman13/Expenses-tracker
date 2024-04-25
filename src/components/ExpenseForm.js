import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [salary, setSalary] = useState('');
  const [expenseReason, setExpenseReason] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [description, setDescription] = useState('');

  // Load salary for the selected month from local storage when component mounts
  useEffect(() => {
    const storedSalary = localStorage.getItem(`${month}-salary`);
    if (storedSalary) {
      setSalary(storedSalary);
    }
  }, [month]);

  // Update local storage when salary changes
  useEffect(() => {
    if (salary) {
      localStorage.setItem(`${month}-salary`, salary);
    }
  }, [salary, month]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object with the form data
    const expenseData = {
      date,
      month,
      salary: parseFloat(salary),
      expenseReason,
      expenseAmount: parseFloat(expenseAmount),
      description
    };
    // Pass the data to the parent component
    addExpense(expenseData);
    // Reset form fields for certain fields
    setExpenseReason('');
    setExpenseAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required /><br /><br />

      <label htmlFor="month">Month:</label>
      <select id="month" value={month} onChange={(e) => setMonth(e.target.value)} required>
        <option value="" disabled>Select Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select><br /><br />

      <label htmlFor="salary">Salary:</label>
      <input type="number" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} required /><br /><br />

      <label htmlFor="expenseReason">Expense Reason:</label>
      <input type="text" id="expenseReason" value={expenseReason} onChange={(e) => setExpenseReason(e.target.value)} required /><br /><br />

      <label htmlFor="expenseAmount">Expense Amount:</label>
      <input type="number" id="expenseAmount" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} required /><br /><br />

      <label htmlFor="description">Description:</label><br />
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" cols="50"></textarea><br /><br />

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
