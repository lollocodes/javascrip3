import { render, screen } from '@testing-library/react';
import App from './App';
import authService from '../service/authService.js';
import UserView from './pages/UserView';
import Login from './pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import memoryService from '../service/memoryService';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("Redirect to profile if logged in", async () => {
  let credential = {username: 'Bob', password: '123'}
  let res = await authService.authenticate(credential);    
  let data = await res.json();
  memoryService.saveLocalValue("JWT_TOKEN", data.accessToken);
  console.log(memoryService.getLocalValue("JWT_TOKEN"))

  expect(global.window.location.pathname).toBe("/");
  render(<App />);

  // const page = screen.getByTestId('user-component');
  
  // expect(page).toBeInTheDocument();
  // expect(global.window.location.pathname).toBe("/user");
});