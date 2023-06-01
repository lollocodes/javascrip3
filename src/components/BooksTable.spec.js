/*
User story
As an admin i'd like a list of all users to be rendered.
*/

import React from 'react';
import { render } from '@testing-library/react';
import BooksTable from './BooksTable';
import adminService from '../service/adminService';

jest.mock('../service/adminService', () => ({
  getUsers: jest.fn(() => Promise.resolve({ users: [] })),
}));

describe('BooksTable', () => {
  test('Call getUsers when user is an admin', async () => {
    const user = { username: 'Billy', role: 'ADMIN' };
    render(<BooksTable user={user} />);

    expect(adminService.getUsers).toHaveBeenCalledTimes(1);
  });

  test('Do not call getUsers when user is not an admin', async () => {
    const user = { username: 'Billy', role: 'USER' };
    render(<BooksTable user={user} />);

    expect(adminService.getUsers).not.toHaveBeenCalled();
  });

});
