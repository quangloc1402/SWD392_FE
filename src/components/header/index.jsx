// src/components/Header.js

import { Layout, Input, Menu, Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header } = Layout;
const { Search } = Input;

const Headers = () => {
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();

  return (
    <Layout className="layout">
      <Header className="shopee-header">
        <div className="logo">
          <a href="/">
            <img src="logo.png" alt="Shopee Logo" />
          </a>
        </div>

        {/* Search Bar */}

        <Search className="search"></Search>
        {/* Menu Links */}
        <Menu
          mode="horizontal"
          className="shopee-menu"
          style={{ flexGrow: 1, justifyContent: "flex-end" }}
        >
          <Menu.Item key="1">
            <a href="/login">Login</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/register">Sign Up</a>
          </Menu.Item>
          <Menu.Item key="5" onClick={() => navigate("/cart")}>
            <Badge count={cart.length}>
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
    </Layout>
  );
};

export default Headers;
