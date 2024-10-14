import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import { Badge, Layout, Menu } from "antd";
import {
  StarOutlined,
  StarFilled,
  StarTwoTone,
  ShoppingCartOutlined,
} from "@ant-design/icons";

function Header() {
  const { Header } = Layout;
  const cart = useSelector((store) => store.cart);
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
        <Menu.Item key="3">Sản Phẩm</Menu.Item>
        <Menu.Item key="4">
          <Badge count={1}>
            <ShoppingCartOutlined
              style={{
                fontSize: 25,
                color: "#fff",
              }}
            />
          </Badge>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Header;
