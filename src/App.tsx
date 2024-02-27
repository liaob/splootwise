/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { UserDisplay } from './components/UserDisplay';
import { Expense } from './types/Expense';
import { User } from './types/User';
import { ExpenseForm } from './components/ExpenseForm';

export const App = () => {
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [currentExpenses, setCurrentExpenses ] = useState<Expense[]>([]);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);

  return (
    <>
      <span>
        <img style={{maxHeight:'150px'}} src='./images/splooty.jpeg'/>
        <h1>Splootwise</h1>
      </span>
      <UserDisplay currentUsers={currentUsers} setCurrentUsers={setCurrentUsers} />
      <ExpenseForm users={currentUsers} setUsers={setCurrentUsers} totalExpense={totalExpense} setTotalExpense={setTotalExpense} currentExpenses={currentExpenses} setCurrentExpenses={setCurrentExpenses} />
    </>
  );
};