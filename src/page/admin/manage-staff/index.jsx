import { Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";

function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  //Create
  const handleSubmit = (values) => {
    console.log(values);
    try {
      api.post("https://66fe45ce2b9aac9c997b1b3c.mockapi.io/Staff", values);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "https://66fe45ce2b9aac9c997b1b3c.mockapi.io/Staff"
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
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: () => <Button>Delete</Button>,
    },
  ];
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <h1>User Management</h1>
      <Button onClick={() => setOpenModal(true)}> Create New Staff</Button>
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
          <Form.Item
            label="Staff name"
            name="name"
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

export default ManageStaff;
