import { render, screen } from '@testing-library/react';
import Login from './pages/Login';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test("username and password field exist", () => {
  render(<Login />);

  const usernameLbl = screen.getByText("Username");
  const passwordLbl = screen.getByText("Password");

  expect(usernameLbl).toBeInTheDocument();
  expect(passwordLbl).toBeInTheDocument();
});



