/*
User story
As a user I would like the input data to be passed to the addbook function when the add 
button is pressed.
*/

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddBookModal from './AddBookModal';

describe('AddBookModal', () => {
  test('should call onSave with correct book data when Add button is clicked', () => {
    const onSaveMock = jest.fn();
    const onCloseMock = jest.fn();
    render(<AddBookModal isOpen={true} onClose={onCloseMock} onSave={onSaveMock} />);

    const titleInput = screen.getByRole('textbox', { name: 'Title:' });
    const quantityInput = screen.getByRole('textbox', { name: 'Quantity:' });
    const authorInput = screen.getByRole('textbox', { name: 'Author:' });

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
  
  });
});
