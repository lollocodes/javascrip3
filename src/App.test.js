import { render, screen } from '@testing-library/react';
import App from './App';
import authService from './service/authService';
import UserView from './pages/UserView';
import Login from './pages/Login';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("Redirect to profile if logged in", async () => {
  await authService.authenticate("Bob", "123");

  render(<Login />);

  
  expect(global.window.location.pathname).toBe("/user");
});


