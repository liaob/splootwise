import React from 'react';
import { Expense } from '../types/Expense';

type ExpenseSummaryProps = {
  totalCost: number
  expenses: Expense[]
};

export const ExpenseSummary = ({ totalCost, expenses }: ExpenseSummaryProps) => {
  return (<>
    <h2>Total Cost: ${totalCost.toFixed(2)}</h2>
    {expenses.map((expense => <p>{expense.name} : {expense.price}</p>))}
  </>);

};