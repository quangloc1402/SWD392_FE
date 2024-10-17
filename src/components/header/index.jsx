import { Badge, Layout, Menu } from "antd";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const { Header } = Layout;
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();
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
        <Menu.Item key="4" onClick={() => navigate("/cart")}>
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
  );
}

export default Header;
