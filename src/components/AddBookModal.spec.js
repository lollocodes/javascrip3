import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddBookModal from './AddBookModal';

describe('AddBookModal', () => {
  test('should call onSave with correct book data when Add button is clicked', () => {
    const onSaveMock = jest.fn();
    const onCloseMock = jest.fn();
    render(<AddBookModal isOpen={true} onClose={onCloseMock} onSave={onSaveMock} />);

    const titleInput = screen.getByLabelText('Title:');
    const quantityInput = screen.getByLabelText('Quantity:');
    const authorInput = screen.getByLabelText('Author:');
    const addButton = screen.getByText('Add');

    const book = {
      title: 'Book Title',
      author: 'Book Author',
      quantity: 5,
    };

    fireEvent.change(titleInput, { target: { value: book.title } });
    fireEvent.change(authorInput, { target: { value: book.author } });
    fireEvent.change(quantityInput, { target: { value: book.quantity } });

    fireEvent.click(addButton);

    expect(onSaveMock).toHaveBeenCalledTimes(1);
    // expect(adminService.addBook).toHaveBeenCalledWith(book);
  });
});
