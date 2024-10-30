import React from 'react';
import { Layout, Menu } from 'antd'; 
import "./index.scss";

const { Header } = Layout; 

const Header2 = () => {
  return (
    <Header className="secondary-header">
      <Menu mode="horizontal" style={{ justifyContent: "center" }}>
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="about">About Us</Menu.Item>
        <Menu.Item key="services">Services</Menu.Item>
        <Menu.Item key="contact">Contact</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Header2;
