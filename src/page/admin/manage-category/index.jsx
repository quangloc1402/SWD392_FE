import React, { useEffect, useState } from "react";
import { Layout, Table, Spin, message, Collapse } from "antd";
import api from "../../../config/axios";
import "./ManageCategory.css";

const { Content } = Layout;
const { Panel } = Collapse;

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await api.get(`category`); // Adjust the API endpoint as needed
        if (response.data) {
          setCategories(response.data);
        } else {
          message.warning("No categories found.");
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
        message.error("Could not load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  const categoryColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Danh Mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const postColumns = [
    {
      title: 'Tên Đồ Chơi',
      dataIndex: 'toyName',
      key: 'toyName',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => <img src={imageUrl} alt="Post" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Giá Theo Ngày',
      dataIndex: 'priceByDay',
      key: 'priceByDay',
    },
    {
      title: 'Phí Đặt Cọc',
      dataIndex: 'depositFee',
      key: 'depositFee',
    },
    {
      title: 'Loại Bài Đăng',
      dataIndex: 'postType',
      key: 'postType',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Content className="manage-category-content">
      <div className="manage-category-container">
        <h2>Quản Lý Danh Mục</h2>
        <Table 
          dataSource={categories} 
          columns={categoryColumns} 
          rowKey="id" 
          pagination={false}
        />
        <Collapse defaultActiveKey={[]}>
          {categories.map(category => (
            <Panel header={category.categoryName} key={category.id}>
              <Table 
                dataSource={category.posts} 
                columns={postColumns} 
                rowKey="id" 
                pagination={false}
              />
            </Panel>
          ))}
        </Collapse>
      </div>
    </Content>
  );
};

export default ManageCategory;
