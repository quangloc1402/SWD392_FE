import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Fetch Staff List
  const fetchStaff = async () => {
    try {
      const response = await api.get("/v1/account/staff");
      setStaffs(response.data); // Update state with the latest data
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  // Create or Update Staff
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (!values.id) {
        values.isActive = true; // Set new staff status as active by default
      }

      if (values.id) {
        // Update staff
        await api.put(`v1/account/${values.id}`, values);
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
      await api.delete(`v1/account/${id}`);
      toast.success("Staff deleted successfully!");
      fetchStaff(); // Refresh staff list
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  // Restore Staff
  const handleRestore = async (id) => {
    try {
      await api.put(`v1/account/${id}/restore`);
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
          <Popconfirm
            title="Delete"
            description="Do you want to delete this staff?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          {!staff.is_active && ( // Show Restore button only if the user is deleted
            <Button
              type="default"
              onClick={() => handleRestore(id)}
              style={{ marginLeft: 8 }}
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
      <Button onClick={handleOpenModal}>Create New Staff</Button>
      <Table columns={columns} dataSource={staffs} rowKey="id" />
      <Modal
        title="Staff"
        open={openModal}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
        confirmLoading={loading} // Show loading state on confirm button
      >
        <Form
          form={form}
          labelCol={{ span: 24 }}
          onFinish={handleSubmit}
        >
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
