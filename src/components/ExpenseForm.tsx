import React, { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../types/User';
import { Expense } from '../types/Expense';
import { ExpenseSummary } from './ExpenseSummary';
import { ExpenseUsersChecklist } from './ExpenseUsersChecklist';
import { v4 } from 'uuid';

type ExpenseFormProps = {
  users: User[];
  totalExpense: number;
  setTotalExpense: Dispatch<SetStateAction<number>>;
  currentExpenses: Expense[];
  setCurrentExpenses: Dispatch<SetStateAction<Expense[]>>
}

export const ExpenseForm = ({ users, totalExpense, setTotalExpense, currentExpenses, setCurrentExpenses }: ExpenseFormProps) => {
  const [currentExpense, setCurrentExpense ] = useState<number>(0);
  const [expenseName, setExpenseName] = useState<string>('');
  const [checkedUsers, setCheckedUsers] = useState<User[]>([]);

  const addExpense = () => {
    setTotalExpense(totalExpense + currentExpense);
    const newExpense: Expense = {
      id: v4(),
      name: expenseName,
      price: currentExpense,
      users: checkedUsers,
    };
    setCurrentExpenses(currentExpenses.concat(newExpense));
    setCheckedUsers(users);
    console.log('New Expense Added: ', newExpense);
  };


  return (
    <>
      <ExpenseSummary totalCost={totalExpense} expenses={currentExpenses}/>
      <form onSubmit={(e) => {
        e.preventDefault();
        setTotalExpense(totalExpense + currentExpense);
        setCurrentExpense(0);
      }}
      >
        <label>Enter Expense: </label><br/>
        <label>Expense Name: </label><input type='string' value={expenseName} onChange={e => setExpenseName(e.target.value)}></input><br/>
        <label>Expense Price: </label>
        <input type='number' value={currentExpense} onChange={e => setCurrentExpense(parseInt(e.target.value))}></input><br/>
        <label>Users Involved: </label>
        <ExpenseUsersChecklist users={users} setSelectedUsers={setCheckedUsers} />
        <br/>
        <input type='button' value='Add Expense' onClick={() => addExpense()}></input>
      </form>
    </>
  );
};