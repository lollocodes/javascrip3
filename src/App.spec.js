import { render, screen } from '@testing-library/react';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom';

// Mock react router dom


test("Username and password field exist", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const usernameLbl = screen.getByText("Username");
  const passwordLbl = screen.getByText("Password");

  expect(usernameLbl).toBeInTheDocument();
  expect(passwordLbl).toBeInTheDocument();
});