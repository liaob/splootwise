import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { AddUserForm } from '../components/AddUserForm';

test('disables the add use button if the text field is blank', async () => {
  const addUserForm = render(<AddUserForm currentUsers={[]} setCurrentUsers={() => {}} />);

  const addButton = await addUserForm.findByTestId('add-user-button');
  expect((addButton as HTMLInputElement).disabled).toBe(true);
  addUserForm.unmount();
});


test('enables the add use button if the text field has a value', async () => {
  const addUserForm = render(<AddUserForm currentUsers={[]} setCurrentUsers={() => {}} />);

  const userInput = await addUserForm.findByTestId('add-user-textfield');
  (userInput as HTMLInputElement).value = 'not-null';

  const addButton = await addUserForm.findByTestId('add-user-button');
  expect((addButton as HTMLInputElement).disabled).toBe(true);
  addUserForm.unmount();
});