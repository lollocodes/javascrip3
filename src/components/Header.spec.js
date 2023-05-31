import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Header from './Header';
import authService from '../service/authService';
import { BrowserRouter } from 'react-router-dom';

// Mock authService
jest.mock('../service/authService', () => ({
  logOut: jest.fn(),
}));

describe('Header component', () => {
  test('Log out user when sign out button is clicked and redirect to home', () => {
    const user = { role: 'USER', username: 'Billy' };
    const history = createMemoryHistory();
    history.push('/');

    render(
      <BrowserRouter>
        <Header user={user} />,
      </BrowserRouter>
    );

    const signOutButton = screen.getByText('Sign out');
    fireEvent.click(signOutButton);

    expect(authService.logOut).toHaveBeenCalledTimes(1);
    expect(global.window.location.pathname).toBe("/");
  });
});
