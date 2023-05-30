import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Book from './Book';
import adminService from '../service/adminService';

// Mock the adminService.deleteBook() function
jest.mock('../service/adminService', () => ({
  deleteBook: jest.fn()
}));

describe('Book component', () => {


  test('admin user can delete a book', () => {
    const book = {
      title: 'Test title',
      author: 'Test Author',
      quantity: 15
    };
  
    const user = {
      role: 'ADMIN'
    };
    
    // Render Book component
    render(<Book book={book} user={user} />);

    // Fire event on delete button
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // adminService.deleteBook() is called with a book object
    expect(adminService.deleteBook).toHaveBeenCalledWith(book);
  });
});
