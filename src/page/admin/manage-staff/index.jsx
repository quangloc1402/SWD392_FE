import { Button, Form, Input, Modal, Popconfirm, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]); // State for filtered results
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Fetch Staff List
  const fetchStaff = async () => {
    try {
      const response = await api.get("/v1/account/staff");
      setStaffs(response.data);
      setFilteredStaffs(response.data); // Initialize filtered data
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  // Filter staff by search term
  useEffect(() => {
    const filtered = staffs.filter(staff =>
      staff.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaffs(filtered);
  }, [searchTerm, staffs]);

  // Create or Update Staff
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (!values.id) {
        values.isActive = true; // Set new staff status as active by default
      }

      if (values.id) {
        // Update staff
        await api.put(`/v1/account/${values.id}`, values);
        toast.success("Staff updated successfully!");
      } else {
        // Create new staff
        await api.post("/staff", values);
        toast.success("Staff created successfully!");
      }

      fetchStaff(); // Refresh staff list
      form.resetFields();
      setOpenModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Delete Staff
  const handleDelete = async (id) => {
    try {
      await api.delete(`/v1/account/${id}`);
      toast.success("Staff deleted successfully!");
      fetchStaff(); // Refresh staff list
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  // Restore Staff
  const handleRestore = async (id) => {
    try {
      await api.put(`/v1/account/${id}/restore`);
      toast.success("Staff restored successfully!");
      fetchStaff(); // Refresh staff list
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  // Fetch staff on component mount
  useEffect(() => {
    fetchStaff();
  }, []);

  // Table Columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Is Active",
      dataIndex: "active",
      key: "active",
      render: (e) => <Tag color={e ? "green" : "red"}>{e ? "True" : "False"}</Tag>
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, staff) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setOpenModal(true);
              form.setFieldsValue(staff);
            }}
          >
            Update
          </Button>
          {staff.active ? (
            <Popconfirm
              title="Delete"
              description="Do you want to ban this staff?"
              onConfirm={() => handleDelete(id)}
            >
              <Button type="primary" danger>
                Ban
              </Button>
            </Popconfirm>
          ) : (
            <Button
              type="default"
              onClick={() => handleRestore(id)}
            >
              Restore
            </Button>
          )}
        </>
      ),
    },
  ];

  // Open Modal
  const handleOpenModal = () => {
    setOpenModal(true);
    form.resetFields(); // Reset form fields when opening modal
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <div>
      <h1>Staff Management</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Button type="primary" onClick={handleOpenModal}>
          Create New Staff
        </Button>
        <Input
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Table columns={columns} dataSource={filteredStaffs} rowKey="id" />
      <Modal
        title="Staff"
        open={openModal}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
        confirmLoading={loading} 
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Staff Name"
            name="username"
            rules={[{ required: true, message: "Please input staff's name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input an email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input a phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input a password!" },
              { min: 6, message: "Password must be at least 6 characters long." },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageStaff;
