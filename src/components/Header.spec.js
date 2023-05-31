import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import authService from '../service/authService';

jest.mock('../service/authService', () => ({
  logOut: jest.fn(),
}));

describe('Header component', () => {

  test('Log out user when sign out button is clicked', () => {
    const user = { role: 'USER', username: 'Billy' };
    render(
      <BrowserRouter>
        <Header user={user} />
      </BrowserRouter>
    );

    const signOutButton = screen.getByText('Sign out');
    fireEvent.click(signOutButton);

    expect(authService.logOut).toHaveBeenCalledTimes(1);
  });
});
