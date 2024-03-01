import React, { Dispatch, SetStateAction } from 'react';
import { User } from '../types/User';
import { UserBlock } from './UserBlock';
import './UserDisplay.css';
import { AddUserForm } from './AddUserForm';

type UserDisplayProps = {
  currentUsers: User[];
  setCurrentUsers: Dispatch<SetStateAction<User[]>>
};

export const UserDisplay = ({ currentUsers, setCurrentUsers }: UserDisplayProps) => {

  return (
    <div className='user-wall'>
      <AddUserForm
        currentUsers={currentUsers}
        setCurrentUsers={user => setCurrentUsers(user)}
      />
      <h2>User List:</h2>
      <div className='userdisplay'>
        {currentUsers.length ? currentUsers.map((user) => {
          return <UserBlock name={user.name} owes={user.owes} id={user.id} />;
        }) : <h3>Currently No Users</h3>}
      </div>
    </div>
  );
};