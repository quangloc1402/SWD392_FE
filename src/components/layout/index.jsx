import React from "react";
import Headers from "../header";
import MyFooter from "../footer";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div>
      <Headers />
      <div
        className="main-content"
        style={{
          padding: 150,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
      <MyFooter />
    </div>
  );
}
export default Layout;
