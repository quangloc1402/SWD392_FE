import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/counterSlice";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/Dashboard/${key}`}>{label}</Link>,
  };
}

const items = [
  getItem("Manage Staff", "managestaff", <PieChartOutlined />),
  getItem("Manage User", "manageuser", <PieChartOutlined />),
  getItem("Manage Category", "managecategory", <PieChartOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{ paddingTop: "10vh" }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ marginLeft: '16px' }}>Dashboard</h1>
         

          <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginRight: '16px' }}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
