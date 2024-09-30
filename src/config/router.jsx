import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
// import Test from "../component/Test";

import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import Dashboard from "../components/dashboard";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
]);
