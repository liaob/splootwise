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

  const settleUp = () => {
    if(totalExpense === 0 || currentUsers.length === 0) return;
    let usersClone = currentUsers;
    let settleStatement = {};

    // sorted lowest to highest
    const sortedUsers = [...currentUsers].sort((a,b) => {
      return a.owes - b.owes;
    });

    let l = 0;
    let r = sortedUsers.length-1;
    let currentDebt = Math.abs(sortedUsers[l].owes);
    let currentSettle = Math.abs(sortedUsers[r].owes);
    const statementUl = document.createElement('ul');

    while(l !== r){
      if(currentDebt > currentSettle){
        currentDebt -= currentSettle;
        const li = document.createElement('li');
        li.innerText = `${sortedUsers[r].name} pays ${sortedUsers[l].name} ${currentSettle}`;
        statementUl.appendChild(li);
        r--;
        currentSettle = Math.abs(sortedUsers[r].owes);
      } else {
        currentSettle -= currentDebt;
        const li = document.createElement('li');
        li.innerText = `${sortedUsers[r].name} pays ${sortedUsers[l].name} ${currentDebt}`;
        statementUl.appendChild(li);
        l++;
        currentDebt = Math.abs(sortedUsers[l].owes);
      }
    }
    document.getElementById('settleStatement')?.appendChild(statementUl);
  };

  return (
    <>
      <span>
        <img style={{maxHeight:'150px', margin:'0 auto', display:'flex', paddingTop:'30px'}} src='./splooty.jpeg'/>
        <h1 style={{textAlign:'center', fontFamily:'Brush Script MT, Brush Script Std, cursive', fontSize:'50px' }}>Splootwise</h1>
      </span>
      <div style={{padding:'2vw 9vw'}}>
        <label>Import Data </label><input type="file" id="fileupload" onChange={(e) => setFile(e.target.files!!)}/><br/>
        <label>Export Data </label><button onClick={() => handleSaveToPC()}>Click</button><br/>
        <label>Copy Data </label><button id="copyButton" onClick={() => copyDataToClipboard()}>Copy</button>
      </div>
      <UserDisplay currentUsers={currentUsers} setCurrentUsers={setCurrentUsers} />
      <ExpenseForm users={currentUsers} setUsers={setCurrentUsers} totalExpense={totalExpense} setTotalExpense={setTotalExpense} currentExpenses={currentExpenses} setCurrentExpenses={setCurrentExpenses} />
      <button style={{margin:'2vw 9vw'}} onClick={() => settleUp()}>Settle Up</button>
      <div style={{margin:'2vw 9vw'}} id='settleStatement'></div>
    </>
  );
};