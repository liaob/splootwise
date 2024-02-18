import React from 'react';
import { User } from '../types/User';
import './UserBlock.css';

export const UserBlock = ({ name, owes, id } : User) => {
  return (
    <div className='userblock'>
      <p>Name: {name}</p>
      <p>Owes: ${owes}</p>
      <p>Remove this later, id: {id}</p>
    </div>);
};