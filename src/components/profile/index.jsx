import React, { useEffect, useState } from "react";
import { Layout, Col, Form, Spin, message, Avatar } from "antd";
import { SignatureOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import { useParams } from "react-router-dom";
import "./index.scss";

const { Content } = Layout;

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get(`v1/account/user/${id}`);
        if (response.data) {
          setUserData(response.data);
        } else {
          message.warning("No user data found.");
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        message.error("Could not load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <Content className="profile-content">
      <div className="profile-wrapper">
        <div className="manage-account">
          <div className="account-info">
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00", marginRight: "10px" }}>
              U
            </Avatar>
            <div className="username">{userData.username || "N/A"}</div>
          </div>
          <div className="edit-profile">
            <SignatureOutlined /> Sửa Hồ Sơ
          </div>
          <h3>Tài Khoản Của Tôi</h3>
          <ul>
            <li onClick={() => message.info("Hồ Sơ clicked")}>Hồ Sơ</li>
            <li onClick={() => message.info("Đổi Mật Khẩu clicked")}>Đổi Mật Khẩu</li>
            <li onClick={() => message.info("Địa Chỉ clicked")}>Địa Chỉ</li>
          </ul>
        </div>

        <div className="profile-container">
          <Form layout="vertical">
            <Col>
              <Form.Item label="Tên Đăng Nhập">
                <div className="profile-item">{userData.username || "N/A"}</div>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Email">
                <div className="profile-item">{userData.email || "N/A"}</div>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Điện Thoại">
                <div className="profile-item">{userData.phone || "N/A"}</div>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Địa Chỉ">
                <div className="profile-item">{userData.address || "N/A"}</div>
              </Form.Item>
            </Col>
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default Profile;
