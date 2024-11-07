import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
// import Test from "../component/Test";

import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import Dashboard from "../components/dashboard";
import Home from "../page/home";
import ManageStaff from "../page/admin/manage-staff";
import ManageUser from "../page/admin/manage-user";
import ManageCategory from "../page/admin/manage-category";
import CartPage from "../page/cart";
import Layout from "../components/layout";
import SuccessPage from "../page/success";
import History from "../page/history";
import PostSell from "../components/postsell";
import Profile from "../components/profile";
import ProductDetail from "../components/postdetail";
import PostRent from "../components/postrent";
import BuyPage from "../components/buypage";
import Package from "../page/package";
import ForgotPassword from "../components/forgotpassword";
import ResetPassword from "../components/resetpassword";
import GetAllToy from "../components/getalltoy";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import requestPermissions from "./notification";

const ProtectRouteAuth = ({ children }) => {
  const user = useSelector((store) => store.user);
  console.log(user);
  if (user && (user.role === "ADMIN" || user.role === "STAFF")) {
    return children;
  }
  toast.error("Bạn không có quyền truy cập vào trang quản lí ");
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
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/createpostbuy",
        element: <PostSell />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/post/:id",
        element: <ProductDetail />,
      },
      {
        path: "/postrent",
        element: <PostRent />,
      },
      {
        path: "/package",
        element: <Package />,
      },
      {
        path: "/buypage",
        element: <BuyPage />,
      },
      {
        path: "/alltoys/:value?",
        element: <GetAllToy />,
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
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },

  {
    path: "/success",
    element: <SuccessPage />,
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
