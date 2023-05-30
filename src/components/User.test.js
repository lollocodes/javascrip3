import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserTable from './UserTable';
import { deleteUser } from '../service/adminService.js'; // Assuming you have a deleteUser service function

jest.mock('../service/userService'); // Mock the userService module

test('User can delete a user from the table', () => {
  // Mock initial user data
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
  ];

  // Render the component
  render(<UserTable users={users} />);

  // Find the delete button for the second user
  const deleteButton = screen.getByTestId('delete-btn');

  // Simulate a click on the delete button
  fireEvent.click(deleteButton);

  // Check if the deleteUser service function was called with the correct user
  expect(deleteUser).toHaveBeenCalledWith(users[1]);
});
