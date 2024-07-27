import { Expense } from '../types/Expense';
import { User } from '../types/User';

export const addToLocalStorage = (data: any, type: 'User' | 'Expense') => {
  const localData = localStorage.getItem('splootwiseSave');
  if(localData) {
    const parsed = JSON.parse(localData);
    if(type === 'User'){
      parsed.users = data;
    } else {
      parsed.expenses = data;
    }
    localStorage.setItem('splootwiseSave', JSON.stringify(parsed));
  } else {
    const newLocalData = {
      users: [] as User[],
      expenses: [] as Expense[],
    };

    if(type === 'User'){
      newLocalData.users = data;
    } else {
      newLocalData.expenses = data;
    }
    localStorage.setItem('splootwiseSave', JSON.stringify(newLocalData));
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem('splootwiseSave');
};