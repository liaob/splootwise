/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import { User } from '../types/User';

type ExpenseUsersChecklistProps = {
  totalUsers: User[];
  checkedUsers: User[];
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
};

export const ExpenseUsersChecklist = ({totalUsers, checkedUsers, setSelectedUsers}: ExpenseUsersChecklistProps) => {
  const changeSelectedUsers = (id: string, isChecked: boolean ) => {
    console.log(id, isChecked);
    if(isChecked){
      const selectedUser = totalUsers.filter(user => user.id === id);
      setSelectedUsers(checkedUsers.concat(selectedUser));
    }
    else {
      setSelectedUsers(checkedUsers.filter((user) => {
        if(user.id !== id){
          return user;
        }
      }));
    }
  };
  return (
    <>
      {totalUsers?.map((user) => {
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