import React, { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../types/User';
import { Expense } from '../types/Expense';
import { ExpenseSummary } from './ExpenseSummary';
import { ExpenseUsersChecklist } from './ExpenseUsersChecklist';
import { v4 } from 'uuid';

type ExpenseFormProps = {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  totalExpense: number;
  setTotalExpense: Dispatch<SetStateAction<number>>;
  currentExpenses: Expense[];
  setCurrentExpenses: Dispatch<SetStateAction<Expense[]>>;
}

export const ExpenseForm = ({ users, setUsers, totalExpense, setTotalExpense, currentExpenses, setCurrentExpenses }: ExpenseFormProps) => {
  const [currentExpense, setCurrentExpense ] = useState<number>(0);
  const [expenseName, setExpenseName] = useState<string>('');
  const [checkedUsers, setCheckedUsers] = useState<User[]>([]);

  const addExpense = () => {
    setTotalExpense(totalExpense + currentExpense);
    const paidBy = (document.getElementById('paidBy') as HTMLInputElement).value;
    const newExpense: Expense = {
      id: v4(),
      name: expenseName,
      price: currentExpense,
      paidBy,
      users: checkedUsers,
    };
    setCurrentExpenses(currentExpenses.concat(newExpense));
    // go throught the checked users and the paid by user and include the valid items owed.
    const split = currentExpense/checkedUsers.length;
    const paid = users.find((user) => { return user.id === paidBy; });
    const newUsers = users.map((user) => {
      const x = checkedUsers.find((checked) => { return user.id === checked.id; });
      if(x === undefined || x === paid){
        return user;
      } else {
        const newUser = user;
        newUser.owes += split;
        return newUser;
      }
    });
    setUsers(newUsers);
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
        <h3>Enter Expense: </h3><br/>
        <label>Expense Name: </label><input type='string' value={expenseName} onChange={e => setExpenseName(e.target.value)}></input><br/>
        <label>Expense Price: </label>
        <input type='number' value={currentExpense} onChange={e => setCurrentExpense(parseInt(e.target.value))}></input><br/>
        <label>Paid for by: </label>
        <select id="paidBy">
          {users.map((user) => {
            return <option value={user.id}>{user.name}</option>;
          })}
        </select><br/>
        <label>Users Involved: </label>
        <ExpenseUsersChecklist totalUsers={users} checkedUsers={checkedUsers} setSelectedUsers={setCheckedUsers} />
        <br/>
        <input type='button' value='Add Expense' onClick={() => addExpense()} disabled={users.length === 0 ? true : false}></input>
      </form>
    </>
  );
};