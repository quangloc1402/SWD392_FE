import { useEffect, useState } from "react";
import { Layout, Table, Spin, message, Collapse, Button, Modal, Form, Input } from "antd";
import api from "../../../config/axios";
import "./ManageCategory.css";

const { Content } = Layout;
const { Panel } = Collapse;

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]); // For filtered data
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState(""); // For search input

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/category`);
      if (response.data) {
        setCategories(response.data);
        setFilteredCategories(response.data); // Initialize filtered data
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

  // Filter categories based on search term
  useEffect(() => {
    const filtered = categories.filter(category =>
      category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if (editingCategory) {
        await api.put(`/category/${editingCategory.id}`, values);
        message.success("Category updated successfully.");
      } else {
        await api.post(`/category`, values);
        message.success("Category created successfully.");
      }
      fetchCategories();
      setIsModalVisible(false);
      setEditingCategory(null);
      form.resetFields();
    } catch (error) {
      console.error("Failed to submit form", error);
      message.error("Failed to submit category.");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (category = null) => {
    setIsModalVisible(true);
    if (category) {
      setEditingCategory(category);
      form.setFieldsValue(category);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/category/${id}`);
      message.success("Category deleted successfully.");
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
      message.error("Could not delete category.");
    } finally {
      setLoading(false);
    }
  };

  // Columns for Categories
  const categoryColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên Danh Mục', dataIndex: 'categoryName', key: 'categoryName' },
    { title: 'Mô Tả', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button danger onClick={() => deleteCategory(record.id)} style={{ marginLeft: 8 }}>Delete</Button>
        </>
      ),
    },
  ];

  // Columns for Posts within Categories
  const postColumns = [
    { title: 'Tên Đồ Chơi', dataIndex: 'toyName', key: 'toyName' },
    { title: 'Số Lượng', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Hình Ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => <img src={imageUrl} alt="Post" style={{ width: 50, height: 50 }} />,
    },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    { title: 'Giá Theo Ngày', dataIndex: 'priceByDay', key: 'priceByDay' },
    { title: 'Phí Đặt Cọc', dataIndex: 'depositFee', key: 'depositFee' },
    { title: 'Loại Bài Đăng', dataIndex: 'postType', key: 'postType' },
    { title: 'Trạng Thái', dataIndex: 'status', key: 'status' },
  ];

  if (loading) {
    return (
      <div className="spinner-container">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return (
    <Content className="manage-category-content">
      <div className="manage-category-container">
        <h2>Quản Lý Danh Mục</h2>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <Button type="primary" onClick={() => showModal()}>Add Category</Button>
          <Input
            placeholder="Search by Category Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <Table
          dataSource={filteredCategories}
          columns={categoryColumns}
          rowKey="id"
          pagination={false}
          style={{ marginTop: 16 }}
        />
        <Collapse defaultActiveKey={[]}>
          {filteredCategories.map(category => (
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

        <Modal
          title={editingCategory ? "Edit Category" : "Add Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="categoryName"
              label="Tên Danh Mục"
              rules={[{ required: true, message: "Please enter the category name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô Tả"
              rules={[{ required: true, message: "Please enter the description" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Content>
  );
};

export default ManageCategory;
