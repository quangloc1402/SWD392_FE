import React, { useEffect, useState } from "react";
import { Layout, Table, Spin, message, Popconfirm, Button } from "antd";
import api from "../../../config/axios";
import "./ManageStaff.css";

const { Content } = Layout;

const ManageStaff = () => {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffList = async () => {
      setLoading(true);
      try {
        const response = await api.get(`v1/account/staff`);
        if (response.data) {
          setStaffData(response.data);
        } else {
          message.warning("No staff data found.");
        }
      } catch (error) {
        console.error("Failed to fetch staff list", error);
        message.error("Could not load staff data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaffList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`v1/account/staff/${id}`, {
        data: { isDeleted: 1 }, // Sending isDeleted status in the request body
      });
      if (response.status === 200) {
        message.success("Staff member deleted successfully.");
        setStaffData((prevData) => 
          prevData.map((staff) => 
            staff.id === id ? { ...staff, status: false } : staff // Update the status locally
          )
        );
      } else {
        message.error("Failed to delete staff member.");
      }
    } catch (error) {
      console.error("Error deleting staff member", error);
      message.error("Could not delete staff member.");
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

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
      render: (phone) => phone.split('|').map((num, index) => (
        <div key={index}>{num}</div>
      )),
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
      render: (image) => <img src={image} alt="Staff" style={{ width: 50, height: 50 }} />,
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
    {
      title: 'Hành Động',
      key: 'action',
      render: (text, record) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa nhân viên này không?"
          onConfirm={() => handleDelete(record.id)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="primary" danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Content className="manage-staff-content">
      <div className="manage-staff-container">
        <h2>Danh Sách Nhân Viên</h2>
        <Table 
          dataSource={staffData} 
          columns={columns} 
          rowKey="id" 
          pagination={false}
        />
      </div>
    </Content>
  );
};

export default ManageStaff;
