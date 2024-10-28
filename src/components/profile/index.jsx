import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Form, Spin, message } from "antd";
import api from "../../config/axios";
import { useParams } from "react-router-dom";
import "./Profile.css"

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
      <div className="profile-container">
        <Form layout="vertical" style={{ maxWidth: 800, margin: "0 auto" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tên Đăng Nhập">
                <div className="profile-item">
                  {userData.username || "N/A"}
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
                <div className="profile-item">
                  {userData.email || "N/A"}
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Điện Thoại">
                <div className="profile-item">
                  {userData.phone || "N/A"}
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Địa Chỉ">
                <div className="profile-item">
                  {userData.address || "N/A"}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Content>
  );
};

export default Profile;
