import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
// import Test from "../component/Test";

import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import Dashboard from "../components/dashboard";
import Home from "../page/home";
import ManageStaff from "../page/admin/manage-staff";
import ManageUser from "../page/admin/manage-user";
import ManageCategory from "../page/admin/manage-category";
import Layout from "../components/layout";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProtectRouteAuth = ({ children }) => {
  const user = useSelector((store) => store.user);
  console.log(user);
  if (user && user?.role === "ADMIN") {
    return children;
  }
  toast.error("Ai cho may vo ? Cút !! ");
  return <Navigate to={"/"} />;
};
export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "check-out",
        element: <Home />,
      },
    ],
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },
  {
    path: "/Dashboard",
    element: (
      <ProtectRouteAuth>
        <Dashboard />
      </ProtectRouteAuth>
    ),
    children: [
      {
        path: "managestaff",
        element: <ManageStaff />,
      },
      {
        path: "manageuser",
        element: <ManageUser />,
      },
      {
        path: "managecategory",
        element: <ManageCategory />,
      },
    ],
  },
]);
