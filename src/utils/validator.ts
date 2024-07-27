import { Expense } from '../types/Expense';

export const validateExpense = (expense: Expense): boolean => {
  if(expense.price <= 0){
    return false;
  }

  if(expense.users.length === 0) {
    return false;
  }

  if(expense.name.trim() === ''){
    return false;
  }
  
  return true;
};