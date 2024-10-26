import React, { useEffect, useState } from "react";
import { Layout, Descriptions, Spin, message } from "antd";
import api from "../../config/axios";
import { useParams } from "react-router-dom";

const { Content } = Layout;

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true); // Ensure loading is true when starting a fetch
      try {
        const response = await api.get(`v1/account/${id}`);
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

  if (loading) return <Spin tip="Loading..." size="large" />;

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <Content className="profile-content">
      <div className="profile-container">
        <Descriptions title="Thông Tin Tài Khoản" bordered>
          <Descriptions.Item label="Tên Đăng Nhập">
            {userData.username || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {userData.email || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Điện Thoại">
            {userData.phone || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Địa Chỉ">
            {userData.address || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Content>
  );
};

export default Profile;
