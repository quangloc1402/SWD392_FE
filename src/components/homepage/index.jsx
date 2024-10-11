import React from "react";
import { Layout, Menu, Typography, Button } from "antd";
import "./index.scss";
const Homepage = () => {
  const { Header, Content, Footer } = Layout;
  const { Title, Paragraph } = Typography;
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Trang Chủ</Menu.Item>
          <Menu.Item key="2">Giới Thiệu</Menu.Item>
          <Menu.Item key="3">Dịch Vụ</Menu.Item>
          <Menu.Item key="4">Liên Hệ</Menu.Item>
          <Menu.Item key="5">UserButton </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "50px" }}>
        <Title level={1}>Chào Mừng Đến Với Homepage!</Title>
        <Paragraph>
          Đây là nơi thông tin quan trọng được cung cấp. Bạn có thể tìm hiểu
          thêm về chúng tôi qua các mục trên menu!
        </Paragraph>
        <Button type="default" size="middle">
          Tìm Hiểu Thêm
        </Button>
      </Content>
      <Footer style={{ textAlign: "center" }}>Bản quyền © 2024</Footer>
    </Layout>
  );
};

export default Homepage;
