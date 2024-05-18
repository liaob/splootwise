/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { UserDisplay } from './components/UserDisplay/UserDisplay';
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
        <img style={{maxHeight:'150px', margin:'0 auto', display:'flex', paddingTop:'30px'}} src='./images/splooty.jpeg'/>
        <h1 style={{textAlign:'center', fontFamily:'Brush Script MT, Brush Script Std, cursive', fontSize:'50px' }}>Splootwise</h1>
      </span>
      <UserDisplay currentUsers={currentUsers} setCurrentUsers={setCurrentUsers} />
      <ExpenseForm users={currentUsers} setUsers={setCurrentUsers} totalExpense={totalExpense} setTotalExpense={setTotalExpense} currentExpenses={currentExpenses} setCurrentExpenses={setCurrentExpenses} />
    </>
  );
};