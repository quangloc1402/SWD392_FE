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
        data: { isDeleted: 1 },
      });
      if (response.status === 200) {
        message.success("Staff member deleted successfully.");
        setStaffData((prevData) => 
          prevData.map((staff) => 
            staff.id === id ? { ...staff, status: false } : staff
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

  // Calculating statistics
  const totalStaff = staffData.length;
  const activeStaff = staffData.filter(staff => staff.status).length;
  const inactiveStaff = totalStaff - activeStaff;
  const roleCounts = staffData.reduce((acc, staff) => {
    acc[staff.role] = (acc[staff.role] || 0) + 1;
    return acc;
  }, {});
  const averagePoint = (staffData.reduce((sum, staff) => sum + (staff.point || 0), 0) / totalStaff).toFixed(2);
  const averagePostCount = (staffData.reduce((sum, staff) => sum + (staff.postCount || 0), 0) / totalStaff).toFixed(2);

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
        <Table 
          dataSource={staffData} 
          columns={columns} 
          rowKey="id" 
          pagination={false}
        />
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px', paddingTop:"20px" }}>
      <p>Tổng số nhân viên: {totalStaff}</p>
      <p>Số nhân viên kích hoạt: {activeStaff}</p>
      <p>Số nhân viên không kích hoạt: {inactiveStaff}</p>
      <p>Điểm trung bình: {averagePoint}</p>
      <p>Số bài đăng trung bình: {averagePostCount}</p>
      <p>Số lượng theo vai trò:</p>

      {Object.entries(roleCounts).map(([role, count]) => (
        <p key={role}>{role}: {count}</p>
      ))}
    </div>
      </div>
      
    </Content>
  );
};

export default ManageStaff;
