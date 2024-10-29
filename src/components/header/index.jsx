import React, { useEffect, useState } from "react";
import { Layout, Input, Menu, Badge, Popover, Avatar, Button } from "antd";
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/counterSlice";
import api from "../../config/axios";
import LOGO from "../../assets/images/logo.jpg";
const { Header } = Layout;
const { Search } = Input;

const Headers = () => {
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const [cartCount, setCartCount] = useState(0);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.location.reload(); // Reloads after navigating
  };

  const content = (
    <div>
      <p
        style={{ marginBottom: "10px" }}
        onClick={() => handleNavigation(`/profile/${user.id}`)}
      >
        Tài Khoản Của Tôi
      </p>
      <p style={{ marginBottom: "10px" }} onClick={handleLogout}>
        Đăng Xuất
      </p>
      <p
        style={{ marginBottom: "10px" }}
        onClick={() => handleNavigation("/history")}
      >
        Lịch Sử Mua Hàng
      </p>
      <p onClick={() => handleNavigation("/createpostBuy")}>Tạo Đơn Bán</p>
    </div>
  );

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await api.get("cart");
        setCartCount(response.data.cartItems.length);
      } catch (error) {
        console.error("Failed to fetch cart count", error);
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, []);

  return (
    <Layout className="layout">
      <Header className="fedutoy-header">
        <div className="logo">
          <a href="/">
            <img src={LOGO} alt="logo" />
          </a>
        </div>

        {/* Search Bar */}
        <Search
          className="search"
          placeholder="Nhập tên đồ chơi"
          onSearch={onSearch}
          enterButton
        />

        {/* Menu Links */}
        <Menu
          mode="horizontal"
          className="shopee-menu"
          style={{ flexGrow: 1, justifyContent: "flex-end" }}
        >
          <Menu.Item key="1">
            <Button
              onClick={() => {
                navigate("/postrent");
              }}
            >
              {" "}
              Rent
            </Button>
          </Menu.Item>
          <div className="menu-items">
            {user == null ? (
              <>
                <Menu.Item key="1">
                  <a href="/login">Log In</a>
                </Menu.Item>
                <Menu.Item key="2">
                  <a href="/register">Sign Up</a>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item key="4">
                <Popover content={content}>
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    U
                  </Avatar>
                </Popover>
              </Menu.Item>
            )}

            <Menu.Item key="5" onClick={() => handleNavigation("/cart")}>
              <Badge count={cartCount}>
                <ShoppingCartOutlined
                  style={{
                    fontSize: 25,
                    color: "#fff",
                  }}
                />
              </Badge>
            </Menu.Item>
          </div>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Headers;
