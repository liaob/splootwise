/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { UserDisplay } from './components/UserDisplay/UserDisplay';
import { Expense } from './types/Expense';
import { User } from './types/User';
import { ExpenseForm } from './components/ExpenseForm';

export const App = () => {
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [file, setFile] = useState<FileList>();
  const [currentExpenses, setCurrentExpenses ] = useState<Expense[]>([]);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);

  type DataContext = {
    expenses: Expense[],
    users: User[],
  }
  const context: DataContext = {
    expenses: currentExpenses,
    users: currentUsers,
  };

  const handleSaveToPC = () => {
    const fileData = JSON.stringify(context);
    const blob = new Blob([fileData], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'splootwise_data.json';
    link.href = url;
    link.click();
  };

  const copyDataToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(context)).then(() => {
      const copy = document.getElementById('copyButton') as HTMLButtonElement;
      copy.innerHTML = 'Copied!';
      setTimeout(() => {
        copy.innerHTML = 'Copy';
      }, 3000);
    });
  };

  if(file){
    const blob = new Blob([file[0]] , {type:'text/plain'});
    blob.text().then((x) => {
      const obj: DataContext = JSON.parse(x);
      setCurrentUsers(obj.users);
      setCurrentExpenses(obj.expenses);
    });
  }

  return (
    <>
      <span>
        <img style={{maxHeight:'150px', margin:'0 auto', display:'flex', paddingTop:'30px'}} src='./splooty.jpeg'/>
        <h1 style={{textAlign:'center', fontFamily:'Brush Script MT, Brush Script Std, cursive', fontSize:'50px' }}>Splootwise</h1>
      </span>
      <UserDisplay currentUsers={currentUsers} setCurrentUsers={setCurrentUsers} />
      <ExpenseForm users={currentUsers} setUsers={setCurrentUsers} totalExpense={totalExpense} setTotalExpense={setTotalExpense} currentExpenses={currentExpenses} setCurrentExpenses={setCurrentExpenses} />

      <label>Import Data </label><input type="file" id="fileupload" onChange={(e) => setFile(e.target.files!!)}/>
      <label>Export Data</label><button onClick={() => handleSaveToPC()}>Click</button>
      <label>Copy Data</label><button id="copyButton" onClick={() => copyDataToClipboard()}>Copy</button>
    </>
  );
};