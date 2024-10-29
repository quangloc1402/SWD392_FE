import React, { useEffect, useState } from "react";
import { Layout, Table, Spin, message } from "antd";
import api from "../../../config/axios";
import "./ManageUser.css";

const { Content } = Layout;

const ManageUser = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserList = async () => {
      setLoading(true);
      try {
        const response = await api.get(`v1/account/user`);
        if (response.data) {
          setUserData(response.data);
        } else {
          message.warning("No user data found.");
        }
      } catch (error) {
        console.error("Failed to fetch user list", error);
        message.error("Could not load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  // Calculate user statistics
  const totalUsers = userData.length;
  const activeUsers = userData.filter(user => user.status).length;
  const inactiveUsers = totalUsers - activeUsers;
  const totalPosts = userData.reduce((sum, user) => sum + (user.postCount || 0), 0);
  const averagePoints = totalUsers > 0 
    ? (userData.reduce((sum, user) => sum + (user.point || 0), 0) / totalUsers).toFixed(2) 
    : 0;

  const columns = [
    {
      title: 'Tên Đăng Nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Điện Thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <span title={phone}>{phone.length > 10 ? `${phone.substring(0, 10)}...` : phone}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (status ? "Kích Hoạt" : "Không Kích Hoạt"),
    },
    {
      title: 'Vai Trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="User" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Số Bài Đăng',
      dataIndex: 'postCount',
      key: 'postCount',
    },
    {
      title: 'Điểm',
      dataIndex: 'point',
      key: 'point',
    },
  ];

  return (
    <Content className="manage-user-content">
      <div className="manage-user-container">
        <Table 
          dataSource={userData} 
          columns={columns} 
          rowKey="id" 
          pagination={false}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px', paddingTop:"20px" }}>
        <p>Tổng số nhân viên: {totalUsers}</p>
        <p>Số nhân viên hoạt động: {activeUsers}</p>
        <p>Số nhân viên không hoạt động: {inactiveUsers}</p>
        <p>Tổng số bài đăng: {totalPosts}</p>
        <p>Điểm trung bình: {averagePoints}</p>
    </div>
      </div>
    </Content>
  );
};

export default ManageUser;
