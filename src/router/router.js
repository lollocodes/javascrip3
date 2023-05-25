import Login from "../pages/Login.js";
import Register from "../pages/Register.js";
import GuestView from "../pages/GuestView.js";
import UserView from "../pages/UserView.js";

const routes = [
  {
    path: "*",
    element: <h2>Path not found</h2>
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/user",
    element: <UserView/>
  },
  {
    path: "/guest",
    element: <GuestView />
  },
  {
    path: "/",
    element: <Login />
  }
];

export default routes;