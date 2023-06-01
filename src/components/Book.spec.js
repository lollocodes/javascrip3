/*
User story
As a admin I want the deletebook function to be called when I click on the delete button and the book to be deleted.
*/

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Book from './Book';
import adminService from '../service/adminService';

// Mock the adminService.deleteBook() function
jest.mock('../service/adminService', () => ({
  deleteBook: jest.fn()
}));

describe('Book component', () => {
  test('When admin deletes a book the expected function is called with the book to be deleted', () => {
    const book = {
      title: 'Test title',
      author: 'Test Author',
      quantity: 15
    };

    const user = {
      role: 'ADMIN'
    };

    render(<table><tbody><Book book={book} user={user} /></tbody></table>);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(adminService.deleteBook).toHaveBeenCalledWith(book);
  });
});
