import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
// import Test from "../component/Test";

import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },
]);
