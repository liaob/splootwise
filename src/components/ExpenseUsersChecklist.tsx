/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import { User } from '../types/User';

type ExpenseUsersChecklistProps = {
  users: User[];
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
};

export const ExpenseUsersChecklist = ({users, setSelectedUsers}: ExpenseUsersChecklistProps) => {
  const changeSelectedUsers = (id: string, isChecked: boolean ) => {
    console.log(id, isChecked);
  };
  return (
    <>
      {users?.map((user) => {
        return (
          <>
            <input type="checkbox" id={user.name} name={user.name} value={user.id} onChange={(e) => { changeSelectedUsers(user.id, e.currentTarget.checked);}}/>
            <label htmlFor={user.name}>{user.name}</label>
          </>
        );
      })}
    </>
  );
};