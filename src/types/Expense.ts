import { User } from './User';

export type Expense = {
  id: string;
  name: string;
  price: number;
  users: User[];
};