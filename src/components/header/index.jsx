import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import { Layout, Menu } from "antd";

function Header() {
  const { Header } = Layout;
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div
        className="logo"
        style={{
          color: "#fff",
          float: "left",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        FEdutoy
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Trang Chủ</Menu.Item>
        <Menu.Item key="2">Giới Thiệu</Menu.Item>
        <Menu.Item key="3">Dịch Vụ</Menu.Item>
        <Menu.Item key="4">Liên Hệ</Menu.Item>
      </Menu>
    </Header>
  );
}

export default Header;
