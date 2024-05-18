import React from 'react';
import { User } from '../../types/User';
import './UserBlock.css';

type UserBlockProps = {
  user: User;
  // eslint-disable-next-line no-unused-vars
  deleteUser: (id:string) => void;
};

export const UserBlock = ({ user, deleteUser }: UserBlockProps) => {
  return (
    <div className='userblock'>
      <p>Name: {user.name}</p>
      <p>Owes: ${user.owes}</p>
      <p>ID: {user.id}</p>
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </div>);
};