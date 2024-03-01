import React from 'react';
import { Expense } from '../types/Expense';

type ExpenseSummaryProps = {
  totalCost: number
  expenses: Expense[]
};

export const ExpenseSummary = ({ totalCost, expenses }: ExpenseSummaryProps) => {
  return (
    <div>
      <h2>Total Cost: ${totalCost.toFixed(2)}</h2>
      {expenses.map(((expense) => {
        return (
          <>
            <h3>Expense: {expense.name} : ${expense.price}</h3>
            <h3>Paid By: {expense.paidBy}</h3>
            <h4>Users Involved: {expense.users.map(user => user.name + ' ')}</h4>
          </>);
      }))}
    </div>);

};