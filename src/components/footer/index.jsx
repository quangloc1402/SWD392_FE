import React from "react";
import { Layout } from "antd";
import "./index.scss";

const { Footer } = Layout;

const MyFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      © {new Date().getFullYear()} FEdutoy. Mang đồ chơi lành mạnh tới gia đình
      bạn.
    </Footer>
  );
};

export default MyFooter;
