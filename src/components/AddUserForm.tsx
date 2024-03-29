import React, { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../types/User';
import { v4 } from 'uuid';

type AddUserFormType = {
  currentUsers: User[]
  setCurrentUsers: Dispatch<SetStateAction<User[]>>
};

export const AddUserForm = ({ currentUsers, setCurrentUsers } : AddUserFormType ) => {
  const [inputData, setInputData] = useState<string>('');
  const addUser = (user: string) => {
    const newUser: User = { 
      name: user,
      id: v4(),
      owes:0
    };
    setCurrentUsers(currentUsers.concat(newUser));
    setInputData('');
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      addUser(inputData);
    }}>
      <label>Enter User: </label><input type='text' value={inputData} onChange={e => setInputData(e.target.value)}></input>
      <input type='button' value='Add User' onClick={() => addUser(inputData)}></input>
    </form>
  );
};
