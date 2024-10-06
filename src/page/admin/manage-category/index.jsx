import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";
import FormItem from "antd/es/form/FormItem";

function ManageCategory() {
  const [staffs, setStaffs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  //Create
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      if (values.id) {
        const response = await api.put(
          `https://670219f0b52042b542d931dd.mockapi.io/USER/${values.id}`,
          values
        );
      } else {
      }
      const response = await api.post(
        "https://670219f0b52042b542d931dd.mockapi.io/USER",
        values
      );
      toast.success("Successfully saved! ");
      fetchStaff();
      form.resetFields;
      setOpenModal(false);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  //Delete
  const handleDelete = async (id) => {
    try {
      await api.delete(
        `https://670219f0b52042b542d931dd.mockapi.io/USER/${id}`
      );
      toast.success("Delete Sucessfully ! ");
      fetchData();
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "https://670219f0b52042b542d931dd.mockapi.io/USER"
      );

      console.log(response.data);
      setStaffs(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchStaff();
  }, []);
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
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, Staff) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setOpenModal(true);
              form.setFieldsValue(Staff);
            }}
          >
            Update
          </Button>
          ,
          <Popconfirm
            title="Delete"
            description="Do you want to Delete this Staff"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
            ,
          </Popconfirm>
        </>
      ),
    },
  ];
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    form.resetFields();
  };
  return (
    <div>
      <h1>User Management</h1>
      <Button onClick={() => setOpenModal(true)}> Create New Category</Button>
      <Table columns={columns} dataSource={staffs} />
      <Modal
        title="Staff"
        open={openModal}
        onCancel={handleCloseModal}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Staff name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input Staff's name!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageCategory;
