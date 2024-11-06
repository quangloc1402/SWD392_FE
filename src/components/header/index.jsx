import React, { useEffect, useState } from "react";
import { Layout, Input, Menu, Badge, Popover, Avatar, Button, Dropdown } from "antd";
import { ShoppingCartOutlined, SearchOutlined, MenuOutlined, DownOutlined } from "@ant-design/icons";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/counterSlice";
import api from "../../config/axios";
import LOGO from "../../assets/images/logo.jpg";
import Category from "../category";




const { Header } = Layout;
const { Search } = Input;

const Headers = () => {
  
  const [visible, setVisible] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);

  const handleMenuClick = (key) => {
    if (currentMenu === key) {
      setVisible(false);
      setCurrentMenu(null);
    } else {
      setCurrentMenu(key);
      setVisible(true);
    }
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item>
        <Category />
      </Menu.Item>
    </Menu>
  );

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
                  <Button
                    type="primary"
                   
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    {" "}
                    Login
                  </Button>
                </Menu.Item>
                <Menu.Item key="2">
                  <Button
                    type="primary"
                    
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    {" "}
                    Sign Up
                  </Button>
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
                    color: "#000",
                  }}
                />
              </Badge>
            </Menu.Item>

          </div>
        </Menu>
      </Header>
      <Header className="secondary-header">
        <Menu mode="horizontal" style={{ justifyContent: "space-between" }}>
          <div className="menu-left">
            <Menu.Item key="10" className="categories-menu-item">
              <MenuOutlined style={{ fontSize: 20, marginRight: 8 }} />
              Shop by Categories
            </Menu.Item>
            <Dropdown overlay={dropdownMenu} trigger={['click']}>
              <Menu.Item key="6">
                Category <DownOutlined />
              </Menu.Item>
            </Dropdown>
            <Menu.Item key="7">
              About Us <DownOutlined />
            </Menu.Item>
            <Menu.Item key="8">
              Services <DownOutlined />
            </Menu.Item>
            <Menu.Item key="9">
              Contact <DownOutlined />
            </Menu.Item>
          </div>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Headers;
